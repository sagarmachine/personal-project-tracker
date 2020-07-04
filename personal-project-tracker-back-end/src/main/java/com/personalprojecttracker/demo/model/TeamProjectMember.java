package com.personalprojecttracker.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeamProjectMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    Boolean leader;

    @ManyToOne
    @JoinColumn
    User user;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    TeamProject teamProject;






}
