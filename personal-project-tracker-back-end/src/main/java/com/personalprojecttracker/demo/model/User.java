package com.personalprojecttracker.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.Date;
import java.util.HashSet;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String UUID;

    @Email
    @Column(unique = true,updatable = false)
    String email;

    @NotNull(message = "name cant be null")
    String name;

    @NotNull(message = "password cant be null")
    String password;

    @NotNull(message = "confirm password cant be null")
    @Transient
    String confirmPassword;


    Date createdDate;
    Date updatedDate;


    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
    Set<Project> projects= new HashSet<>();

    public void addProject(Project project){
        projects.add(project);
    }


    @OneToMany(mappedBy = "user",cascade ={CascadeType.REFRESH,CascadeType.REMOVE},orphanRemoval = true)
    @JsonIgnore
    Set<TeamProjectMember> teamProjectsMember= new HashSet<>();

    public void addTeamProjectMember(TeamProjectMember teamProjectMember){
        teamProjectsMember.add(teamProjectMember);
    }

     @OneToMany(mappedBy = "createdBy")
     @JsonIgnore
      Set<TeamProject> projectsCreated= new HashSet<>();

    public void addCreatedTeamProject(TeamProject teamProject){
        projectsCreated.add(teamProject);
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
