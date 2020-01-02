package com.pyramid.musicapp.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pyramid.musicapp.service.JwtUtil;
import com.pyramid.musicapp.service.MyUserDetailsService;

@Component
public class JwtFilter extends OncePerRequestFilter{
	
	@Autowired
	private MyUserDetailsService userdetailsService;
	
	@Autowired
	private JwtUtil jwtutil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
	
		final String AuthorizaitonHeader = request.getParameter("Authorization");
		
		String username = null;
		String jwt = null;
		
		if(AuthorizaitonHeader!=null && AuthorizaitonHeader.startsWith("Bearer ")) {
			jwt = AuthorizaitonHeader.substring(7);
			username = jwtutil.extractUsername(jwt);
		}
		
		if(username != null && SecurityContextHolder.getContext().getAuthentication()==null) {
			UserDetails userdetails = this.userdetailsService.loadUserByUsername(username);
			if(jwtutil.validateToken(jwt, userdetails)) {
				UsernamePasswordAuthenticationToken uat = new UsernamePasswordAuthenticationToken(userdetails, null, userdetails.getAuthorities());
				uat.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(uat);
			}
		}
		filterChain.doFilter(request, response);
	}

}
