package com.erepnikov.controller.auth;

import com.erepnikov.domain.user.User;
import com.erepnikov.model.response.OperationResponse;
import com.erepnikov.model.response.SessionResponse;
import com.erepnikov.model.request.Login;
import com.erepnikov.model.response.SessionItem;
import com.erepnikov.repository.UserRepository;
import com.erepnikov.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * Class SessionController
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
@RestController
public class SessionController {

    private UserService userService;

    @Autowired
    public SessionController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "api/session")
    public SessionResponse newSession(@RequestBody Login login) {
        User user = this.userService.getUserByUsernameAndPassword(
                login.getUsername(),
                login.getPassword()
        );
        SessionResponse resp = new SessionResponse();
        SessionItem sessionItem = new SessionItem();
        if (user != null) {
            sessionItem.setToken("xxx.xxx.xxx");
            sessionItem.setUsername(user.getUsername());
            sessionItem.setFirstName(user.getFirstName());
            sessionItem.setLastName(user.getLastName());
            sessionItem.setEmail(user.getEmail());
            sessionItem.setRole(user.getRole().name());

            resp.setOperationStatus(OperationResponse.ResponseStatusEnum.SUCCESS);
            resp.setOperationMessage("Login Success");
            resp.setItem(sessionItem);
        } else {
            resp.setOperationStatus(OperationResponse.ResponseStatusEnum.ERROR);
            resp.setOperationMessage("Login Failed");
        }
        return resp;
    }
}
