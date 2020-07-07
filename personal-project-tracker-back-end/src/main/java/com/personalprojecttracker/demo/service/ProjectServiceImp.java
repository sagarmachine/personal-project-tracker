package com.personalprojecttracker.demo.service;


import com.personalprojecttracker.demo.dto.ProjectRequestDto;
import com.personalprojecttracker.demo.dto.UsefullLinkRequestDto;
import com.personalprojecttracker.demo.exception.ProjectNotFoundException;
import com.personalprojecttracker.demo.model.*;
import com.personalprojecttracker.demo.repository.NoteRepository;
import com.personalprojecttracker.demo.repository.ProjectRepository;
import com.personalprojecttracker.demo.repository.UsefullLinkRepository;
import com.personalprojecttracker.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.*;


@Service
@Transactional
@Slf4j
public class ProjectServiceImp implements  IProjectService {

    @Autowired
    IUserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    UsefullLinkRepository usefullLinkRepository;

    @Override
    public Project saveOrUpdateProject(ProjectRequestDto projectRequestDto, Principal principal) {

        User user = userRepository.findByEmail(principal.getName());

        projectRequestDto.setProjectIdentifier(projectRequestDto.getProjectIdentifier().toUpperCase());

        ModelMapper mapper = new ModelMapper();
        Project project = mapper.map(projectRequestDto,Project.class);

            Backlog backlog= new Backlog();
            backlog.setProjectIdentifier(project.getProjectIdentifier());
            backlog.setProject(project);
         //   log.info("-->"+backlog.toString());
            project.setBacklog(backlog);
            user.addProject(project);
            project.setUser(user);


        Set<Note> notes = new HashSet<>();
          for (String noteTemp:projectRequestDto.getNotes()){
            Note note= new Note();
            note.setNote(noteTemp);
            note.setUser(user);
            note.setProject(project);
            notes.add(note);
          //  noteRepository.save(note);
        }
        user.setNotes(notes);
        project.setNotes(notes);

        Set<UsefullLink> usefullLinks= new HashSet<>();
        for (UsefullLinkRequestDto usefullLinkTemp:projectRequestDto.getUsefullLinks()){
            UsefullLink usefullLink = new UsefullLink();
            usefullLink.setComment(usefullLinkTemp.getComment());
            usefullLink.setLink(usefullLinkTemp.getLink());
            usefullLink.setUser(user);
            usefullLink.setProject(project);
            usefullLinks.add(usefullLink);
           // usefullLinkRepository.save(usefullLink);
          }
        user.setUsefullLinks(usefullLinks);
        project.setUsefullLinks(usefullLinks);

      userRepository.save(user);
    //  projectRepository.save(project);
        return projectRepository.findByProjectIdentifier(projectRequestDto.getProjectIdentifier());
    }

    @Override
    public Project getProjectById(String id,Principal principal) {

      Project project =projectRepository.findByProjectIdentifier( id.toUpperCase());
      if(project==null || !project.getUser().getEmail().equals(principal.getName()))
          throw new ProjectNotFoundException("no project with  \""+id+"\" projectIdentifier found");
      return project;
    }

    @Override
    public void deleteProjectById(String id,Principal principal) {
        Project project =projectRepository.findByProjectIdentifier( id.toUpperCase());
        if(project==null || !project.getUser().getEmail().equals(principal.getName()))
            throw new ProjectNotFoundException("no project with  \""+id+"\" projectIdentifier found");

        User user = userRepository.findByEmail(principal.getName());

        user.getProjects().remove(project);
        userRepository.save(user);
        projectRepository.deleteByProjectIdentifier(id.toUpperCase());
    }

    @Override
    public Project updateProject(ProjectRequestDto projectRequestDto, Principal principal) {
        User user = userRepository.findByEmail(principal.getName());

        projectRequestDto.setProjectIdentifier(projectRequestDto.getProjectIdentifier().toUpperCase());

        ModelMapper mapper = new ModelMapper();
        Project project = mapper.map(projectRequestDto,Project.class);

        Optional<Project> projectTempOptional = projectRepository.findById(project.getId());
        if(projectTempOptional.isPresent())
            project.setBacklog((projectTempOptional.get().getBacklog()));
        else
            throw new ProjectNotFoundException("no project with  \""+project.getId()+"\" id found");

        Project projectTemp =projectTempOptional.get();

        Set<Note> notes = new HashSet<>();

        for (String noteTemp:projectRequestDto.getNotes()){
            Note note= new Note();
            note.setNote(noteTemp);
            note.setUser(user);
            note.setProject(project);
            notes.add(note);
            noteRepository.save(note);
        }
        user.setNotes(notes);
        project.setNotes(notes);

        Set<UsefullLink> usefullLinks= new HashSet<>();
        for (UsefullLinkRequestDto usefullLinkTemp:projectRequestDto.getUsefullLinks()){
            UsefullLink usefullLink = new UsefullLink();
            usefullLink.setComment(usefullLinkTemp.getComment());
            usefullLink.setLink(usefullLinkTemp.getLink());
            usefullLink.setUser(user);
            usefullLink.setProject(project);
            usefullLinks.add(usefullLink);
          usefullLinkRepository.save(usefullLink);
        }
        user.setUsefullLinks(usefullLinks);
        project.setUsefullLinks(usefullLinks);

        project.setId(projectTemp.getId());
        project.setCreatedDate(projectTemp.getCreatedDate());
        project.setUser(user);
        project.setProjectIdentifier(projectTemp.getProjectIdentifier());
        userRepository.save(user);
        projectRepository.save(project);
    return project;
    }


}
