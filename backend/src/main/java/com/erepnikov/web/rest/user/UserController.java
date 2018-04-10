package com.erepnikov.web.rest.user;

import com.erepnikov.config.Constants;
import com.erepnikov.domain.user.User;
import com.erepnikov.repository.user.UserRepository;
import com.erepnikov.security.AuthoritiesConstants;
import com.erepnikov.service.dto.UserDTO;
import com.erepnikov.service.user.UserService;
import com.erepnikov.web.exceptions.EmailAlreadyUsedException;
import com.erepnikov.web.exceptions.LoginAlreadyUsedException;
import com.erepnikov.web.exceptions.ServerErrorException;
import com.erepnikov.web.util.PaginationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;

    private final UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/users")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> createUser(@Valid @RequestBody UserDTO userDTO) throws URISyntaxException, EmailAlreadyUsedException, LoginAlreadyUsedException, ServerErrorException {
        if (userDTO.getId() != null) {
            throw new ServerErrorException("User already have an ID");
        } else if (userRepository.findOneByLogin(userDTO.getLogin().toLowerCase()).isPresent()) {
            throw new LoginAlreadyUsedException();
        } else if (userRepository.findOneByEmailIgnoreCase(userDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        }
        userService.createUser(userDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/users")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> updateUser(@Valid @RequestBody UserDTO userDTO) throws LoginAlreadyUsedException, EmailAlreadyUsedException {
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        existingUser = userRepository.findOneByLogin(userDTO.getLogin().toLowerCase());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new LoginAlreadyUsedException();
        }
        userService.updateUser(userDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers(Pageable pageable) {
        final Page<UserDTO> page = userService.getAllManagedUsers(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/users/authorities")
    @Secured(AuthoritiesConstants.ADMIN)
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }

    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String login) throws Exception {
        return new ResponseEntity<>(
                this.userService.getUserWithAuthoritiesByLogin(login).map(UserDTO::new).orElseThrow(Exception::new),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteUser(@PathVariable String login) {
        userService.deleteUser(login);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
