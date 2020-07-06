package com.personalprojecttracker.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jdk.nashorn.internal.ir.annotations.Ignore;
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
public class UsefullLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

   // @Column(nullable = false)
    String link;

    String comment;

    @ManyToOne
     @JsonIgnore
    User user;

    @ManyToOne
    @JsonIgnore
    Project project;

    @ManyToOne
    @JsonIgnore
    ProjectTask projectTask;

}
