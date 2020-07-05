package com.personalprojecttracker.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class TeamBacklog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(nullable = false,updatable = false,unique = true)
    String projectIdentifier;

    int projectTaskSequence=0;

    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
    @JoinColumn(nullable = false)
    @JsonIgnore
    TeamProject teamProject;

    @OneToMany(mappedBy = "teamBacklog",fetch = FetchType.EAGER,cascade = {CascadeType.ALL,CascadeType.REFRESH},orphanRemoval = true)
    Set<TeamProjectTask> teamProjectTasks=new HashSet<>();;

    public void addProjectTask(TeamProjectTask teamProjectTask){
        teamProjectTasks.add(teamProjectTask);
    }

}
