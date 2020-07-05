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
@AllArgsConstructor
@NoArgsConstructor
public class UserTeamProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

   @ManyToOne
   @JoinColumn
   User user;

   @ManyToOne
    @JoinColumn
   @JsonIgnore
   TeamProjectTask teamProjectTask;

}
