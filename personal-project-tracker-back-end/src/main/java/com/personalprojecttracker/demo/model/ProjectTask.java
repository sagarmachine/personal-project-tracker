package com.personalprojecttracker.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;



    String projectTaskIdentifier;

    int preference;

    String summary;

    String status;

    @JsonFormat(pattern = "dd-mm-yyyy")
    Date startDate;

    @JsonFormat(pattern = "dd-mm-yyyy")
    Date endDate;

    @JsonFormat(pattern = "dd-mm-yyyy")
    Date createdDate;

    @JsonFormat(pattern = "dd-mm-yyyy")
    Date updatedDate;

    @PrePersist
    void setCreatedDate(){
        this.createdDate=new Date();
    }

    @PreUpdate
    void setUpdatedDate(){
        this.updatedDate= new Date();
    }


    @ManyToOne(cascade =CascadeType.REFRESH)
    @JoinColumn
    @JsonIgnore
    Backlog backlog;


    @OneToMany(mappedBy = "projectTask",cascade ={CascadeType.ALL},orphanRemoval = true)
    Set<UsefullLink> usefullLinks= new HashSet<>();

    public void addUsefullLink(UsefullLink usefullLink){
        usefullLinks.add(usefullLink);
    }

    @OneToMany(mappedBy = "projectTask",cascade ={CascadeType.ALL},orphanRemoval = true)
    Set<Note> notes= new HashSet<>();

    public void addNote(Note note){
        notes.add(note);
    }

}
