package com.erepnikov.web.rest.user;

import com.erepnikov.web.exceptions.EmailAlreadyUsedException;
import com.erepnikov.web.exceptions.InvalidPasswordException;
import com.erepnikov.web.exceptions.LoginAlreadyUsedException;
import com.erepnikov.web.exceptions.ServerErrorException;
import com.erepnikov.web.vm.ManagedUserVM;
import com.erepnikov.domain.User;
import com.erepnikov.repository.user.UserRepository;
import com.erepnikov.security.SecurityUtils;
import com.erepnikov.service.user.UserService;
import com.erepnikov.service.dto.UserDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
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
        userService.updateUser(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail());
    }

    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody String password) throws InvalidPasswordException {
        if (!checkPasswordLength(password)) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(password);
    }

    private static boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password) &&
                password.length() >= ManagedUserVM.PASSWORD_MIN_LENGTH &&
                password.length() <= ManagedUserVM.PASSWORD_MAX_LENGTH;
    }
}
