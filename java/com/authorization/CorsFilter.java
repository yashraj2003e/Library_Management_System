package com.authorization;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        System.out.println("CORSFilter HTTP Request: " + req.getMethod());

        // Set CORS headers only if not already present
        if (res.getHeader("Access-Control-Allow-Origin") == null) {
            res.addHeader("Access-Control-Allow-Origin", "*, *, *");
            res.addHeader("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD, PUT, POST");
            res.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        }

        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization code, if needed
    }

    @Override
    public void destroy() {
        // Cleanup code, if needed
    }
}
