package com.erepnikov.security;

import com.erepnikov.model.response.OperationResponse;
import com.erepnikov.model.response.SessionResponse;
import com.erepnikov.model.response.SessionItem;
import com.erepnikov.model.user.TokenUser;
import com.erepnikov.service.TokenUtil;
import org.springframework.security.core.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.*;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import org.apache.commons.io.IOUtils;
import org.json.*;

import com.fasterxml.jackson.databind.*;

/**
 * Class GenerateTokenForUserFilter
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
public class GenerateTokenForUserFilter extends AbstractAuthenticationProcessingFilter {

    private TokenUtil tokenUtil;

    public GenerateTokenForUserFilter(String urlMapping, AuthenticationManager authenticationManager, TokenUtil tokenUtil) {
        super(new AntPathRequestMatcher(urlMapping));
        super.setAuthenticationManager(authenticationManager);
        this.tokenUtil = tokenUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException, JSONException {
        try {
            JSONObject userJSON = new JSONObject(
                    IOUtils.toString(request.getInputStream(), "UTF-8")
            );
            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userJSON.getString("username"),
                            userJSON.getString("password")
                    )
            );
        } catch (JSONException | AuthenticationException e) {
            throw new AuthenticationServiceException(e.getMessage());
        }
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest req, HttpServletResponse res,
            FilterChain chain, Authentication authToken
    ) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(authToken);
        TokenUser tokenUser = (TokenUser) authToken.getPrincipal();
        SessionResponse resp = new SessionResponse();
        SessionItem respItem = new SessionItem();
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String tokenString = this.tokenUtil.createTokenForUser(tokenUser);

        respItem.setFirstName(tokenUser.getUser().getFirstName());
        respItem.setLastName(tokenUser.getUser().getLastName());
        respItem.setUsername(tokenUser.getUser().getUsername());
        respItem.setEmail(tokenUser.getUser().getEmail());
        respItem.setToken(tokenString);

        resp.setOperationStatus(OperationResponse.ResponseStatusEnum.SUCCESS);
        resp.setOperationMessage("Login Success");
        resp.setItem(respItem);
        String jsonRespString = ow.writeValueAsString(resp);

        res.setStatus(HttpServletResponse.SC_OK);
        res.getWriter().write(jsonRespString);
        res.getWriter().flush();
        res.getWriter().close();
    }
}
