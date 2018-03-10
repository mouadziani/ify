package com.erepnikov.controller;

import com.erepnikov.controller.exceptions.EmailAlreadyUsedException;
import com.erepnikov.controller.exceptions.InvalidPasswordException;
import com.erepnikov.controller.exceptions.LoginAlreadyUsedException;
import com.erepnikov.controller.exceptions.ServerErrorException;
import com.erepnikov.controller.vm.KeyAndPasswordVM;
import com.erepnikov.controller.vm.ManagedUserVM;
import com.erepnikov.domain.User;
import com.erepnikov.repository.UserRepository;
import com.erepnikov.security.SecurityUtils;
import com.erepnikov.service.UserService;
import com.erepnikov.service.dto.UserDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AccountController {

    private final UserRepository userRepository;

    private final UserService userService;

    public AccountController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) throws InvalidPasswordException {
        if (!checkPasswordLength(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        userRepository.findOneByLogin(managedUserVM.getLogin().toLowerCase()).ifPresent(u -> {
            try {
                throw new LoginAlreadyUsedException();
            } catch (LoginAlreadyUsedException e) {
                e.printStackTrace();
            }
        });
        userRepository.findOneByEmailIgnoreCase(managedUserVM.getEmail()).ifPresent(u -> {
            try {
                throw new EmailAlreadyUsedException();
            } catch (EmailAlreadyUsedException e) {
                e.printStackTrace();
            }
        });
        userService.registerUser(managedUserVM, managedUserVM.getPassword());
    }

    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) throws ServerErrorException {
        Optional<User> user = userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new ServerErrorException("No user was found for this reset key");
        }
    }

    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        return request.getRemoteUser();
    }

    @GetMapping("/account")
    public UserDTO getAccount() throws ServerErrorException {
        return userService.getUserWithAuthorities()
                .map(UserDTO::new)
                .orElseThrow(() -> new ServerErrorException("User could not be found"));
    }

    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody UserDTO userDTO) throws ServerErrorException, EmailAlreadyUsedException {
        final String userLogin = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new ServerErrorException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new ServerErrorException("User could not be found");
        }
        userService.updateUser(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(),
                userDTO.getLangKey(), userDTO.getImageUrl());
    }

    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody String password) throws InvalidPasswordException {
        if (!checkPasswordLength(password)) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(password);
    }

    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) throws ServerErrorException, InvalidPasswordException {
        if (!checkPasswordLength(keyAndPassword.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        Optional<User> user = userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());
        if (!user.isPresent()) {
            throw new ServerErrorException("No user was found for this reset key");
        }
    }

    private static boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password) &&
                password.length() >= ManagedUserVM.PASSWORD_MIN_LENGTH &&
                password.length() <= ManagedUserVM.PASSWORD_MAX_LENGTH;
    }
}
