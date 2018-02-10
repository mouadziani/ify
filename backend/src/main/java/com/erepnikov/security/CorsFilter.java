package com.erepnikov.security;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CorsFilter extends OncePerRequestFilter {

    static final String ORIGIN = "Origin";

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String origin = httpServletRequest.getHeader(ORIGIN);

        httpServletResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");//* or origin as u prefer
        httpServletResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE, PATCH");
        httpServletResponse.setHeader("Access-Control-Max-Age", "3600");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", "content-type, authorization");

        if (httpServletRequest.getMethod().equals("OPTIONS"))
            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        else
            filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
