package com.erepnikov.config;

import com.erepnikov.security.CorsFilter;
import com.erepnikov.security.GenerateTokenForUserFilter;
import com.erepnikov.security.VerifyTokenFilter;
import com.erepnikov.service.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Class SecurityConfig
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private TokenUtil tokenUtil;

    private UserDetailsService userDetailsService;

    @Autowired
    public SecurityConfig(TokenUtil tokenUtil, UserDetailsService userDetailsService) {
        this.tokenUtil = tokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder bcryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .exceptionHandling().and()
                .anonymous().and()
                .csrf().disable()
                .addFilterBefore(
                        new CorsFilter(),
                        ChannelProcessingFilter.class)
                .addFilterBefore(
                        new VerifyTokenFilter(tokenUtil),
                        UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(
                        new GenerateTokenForUserFilter("api/session", authenticationManager(), tokenUtil),
                        UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                    .antMatchers(
                            HttpMethod.GET,
                            "/",
                            "/*.html",
                            "/images/*",
                            "/favicon.ico",
                            "/**/*.html",
                            "/**/*.css",
                            "/**/*.js"
                    ).permitAll()
                    .antMatchers("/api/**").permitAll()
                    .antMatchers("/api/auth/**").authenticated()
                    .anyRequest().authenticated();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(this.bcryptPasswordEncoder());
    }


}
