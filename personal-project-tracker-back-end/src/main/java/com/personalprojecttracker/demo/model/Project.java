package com.personalprojecttracker.demo.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class
Project {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int id;

    @NotNull(message = "project name cant be null")
     @Size(min= 5,message = "project name had to be at least 5 in letters")
    String projectName;

    @Column(unique = true,updatable = false)
    @NotNull(message = "project id cant be null")
    @Size(min = 4,message = "project id had to be at least 4 in letters")
    String projectIdentifier;

    @NotNull(message = "project description cant be null")
    String projectDescription;

    @JsonFormat(pattern = "yyyy-mm-dd")
    Date startingDate;

    @JsonFormat(pattern = "yyyy-mm-dd")
    Date endingDate;

    @JsonFormat(pattern = "yyyy-mm-dd")
    Date createdDate;

    @JsonFormat(pattern = "yyyy-mm-dd")
    Date updatedDate;

    @PostPersist
    void setCreatedDate(){
        this.createdDate=new Date();;
    }

    @PostUpdate
    void setUpdatedDate(){
        this.updatedDate=new Date();

    }

    @OneToOne(mappedBy ="project",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    Backlog backlog;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    User user;


    @ElementCollection
    @CollectionTable(name = "project_notes", joinColumns = @JoinColumn(name="project_id"))
    List<String> notes= new ArrayList<>();


    @ElementCollection
    @CollectionTable(name = "project_use_full_links", joinColumns = @JoinColumn(name="project_id"))
    List <UsefullLink> usefullLinks= new ArrayList<>();

//    @OneToMany(mappedBy = "project",cascade ={CascadeType.ALL},orphanRemoval = true)
//    Set<UsefullLink> usefullLinks= new HashSet<>();
//
//    public void addUsefullLink(UsefullLink usefullLink){
//        usefullLinks.add(usefullLink);
//    }
//
//    @OneToMany(mappedBy = "project",cascade ={CascadeType.ALL},orphanRemoval = true)
//    Set<Note> notes= new HashSet<>();

//    public void addNote(Note note){
//        notes.add(note);
//    }

}




