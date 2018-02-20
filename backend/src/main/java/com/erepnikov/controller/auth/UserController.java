package com.erepnikov.controller.auth;

import com.erepnikov.domain.user.User;
import com.erepnikov.model.response.OperationResponse;
import com.erepnikov.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Class UserController
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
@RestController
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "api/registration")
    public OperationResponse addNewUser(@RequestBody User user) {
        System.out.println(user.toString());
        boolean userAddSuccess = userService.addNewUser(user);
        OperationResponse resp = new OperationResponse();
        if (userAddSuccess){
            resp.setOperationStatus(OperationResponse.ResponseStatusEnum.SUCCESS);
            resp.setOperationMessage("User Added");
        } else {
            resp.setOperationStatus(OperationResponse.ResponseStatusEnum.ERROR);
            resp.setOperationMessage("Unable to add user");
        }
        return resp;
    }
}
