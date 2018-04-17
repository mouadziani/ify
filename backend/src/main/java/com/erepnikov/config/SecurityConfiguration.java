package com.erepnikov.config;

import com.erepnikov.security.AjaxAuthenticationFailureHandler;
import com.erepnikov.security.AjaxAuthenticationSuccessHandler;
import com.erepnikov.security.AjaxLogoutSuccessHandler;
import com.erepnikov.security.AuthoritiesConstants;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.filter.CorsFilter;

import javax.annotation.PostConstruct;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final UserDetailsService userDetailsService;

    private final CorsFilter corsFilter;

    @Value("${remember-me.key}")
    private String rememberMeKey;

    public SecurityConfiguration(
            AuthenticationManagerBuilder authenticationManagerBuilder,
            UserDetailsService userDetailsService,
            CorsFilter corsFilter
    ) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userDetailsService = userDetailsService;
        this.corsFilter = corsFilter;
    }

    @PostConstruct
    public void init() {
        try {
            authenticationManagerBuilder
                    .userDetailsService(userDetailsService)
                    .passwordEncoder(passwordEncoder());
        } catch (Exception e) {
            throw new BeanInitializationException("Security configuration failed", e);
        }
    }

    @Bean
    public AjaxAuthenticationSuccessHandler ajaxAuthenticationSuccessHandler() {
        return new AjaxAuthenticationSuccessHandler();
    }

    @Bean
    public AjaxAuthenticationFailureHandler ajaxAuthenticationFailureHandler() {
        return new AjaxAuthenticationFailureHandler();
    }

    @Bean
    public AjaxLogoutSuccessHandler ajaxLogoutSuccessHandler() {
        return new AjaxLogoutSuccessHandler();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                    .addFilterBefore(corsFilter, CsrfFilter.class)
                    .exceptionHandling()
                .and()
                    .rememberMe()
                    .rememberMeCookieName("ideaforyou-remember-me")
                    .rememberMeParameter("remember-me")
                    .tokenValiditySeconds(24 * 60 * 60)
                    .key(rememberMeKey)
                .and()
                    .formLogin()
                    .loginProcessingUrl("/api/authentication")
                    .successHandler(ajaxAuthenticationSuccessHandler())
                    .failureHandler(ajaxAuthenticationFailureHandler())
                    .usernameParameter("username")
                    .passwordParameter("password")
                    .permitAll()
                .and()
                    .logout()
                    .deleteCookies("JSESSIONID")
                    .logoutUrl("/api/logout")
                    .logoutSuccessHandler(ajaxLogoutSuccessHandler())
                    .permitAll()
                .and()
                    .headers()
                    .frameOptions()
                    .disable()
                .and()
                    .authorizeRequests()
                    .antMatchers("/api/register").permitAll()
                    .antMatchers("/api/authenticate").permitAll()
                    .antMatchers(HttpMethod.GET, "/api/**").permitAll()
                    .antMatchers("/api/**").authenticated()
                    .antMatchers("/api/news/**").hasAuthority(AuthoritiesConstants.MODERATOR)
                    .antMatchers("/api/article/**").hasAuthority(AuthoritiesConstants.MODERATOR)
                    .antMatchers("/api/video/**").hasAuthority(AuthoritiesConstants.MODERATOR)
                    .antMatchers("/api/comment/**").hasAuthority(AuthoritiesConstants.USER)
                    .antMatchers("/api/blog/**").hasAuthority(AuthoritiesConstants.USER);
    }
}
