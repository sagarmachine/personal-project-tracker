package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.dto.ProjectTaskRequestDto;
import com.personalprojecttracker.demo.dto.UsefullLinkRequestDto;
import com.personalprojecttracker.demo.exception.ProjectNotFoundException;
import com.personalprojecttracker.demo.model.*;
import com.personalprojecttracker.demo.repository.BacklogRepository;
import com.personalprojecttracker.demo.repository.ProjectTaskRepository;
import com.personalprojecttracker.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.Set;


@Service
@Transactional
@Slf4j
 public class ProjectTaskServiceImp implements IProjectTaskService{

    @Autowired
    BacklogRepository backlogRepository;

    @Autowired
    ProjectTaskRepository projectTaskRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTaskRequestDto projectTaskRequestDto, Principal principal) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        User user = userRepository.findByEmail(principal.getName());
        if(backlog==null || !principal.getName().equals(backlog.getProject().getUser().getEmail()))
            throw  new ProjectNotFoundException("no project found with projectIdentifier=\""+projectIdentifier+"\"");
       // projectTask.setProjectTaskIdentifier(projectTask.getProjectTaskIdentifier().toUpperCase());
        backlog.setProjectTaskSequence(backlog.getProjectTaskSequence()+1);

        ModelMapper mapper = new ModelMapper();
        ProjectTask projectTask= mapper.map(projectTaskRequestDto,ProjectTask.class);
        projectTask.setProjectTaskIdentifier(projectIdentifier.toUpperCase()+"-"+backlog.getProjectTaskSequence());
        projectTask.setStatus("TO_DO");
        projectTask.setBacklog(backlog);
        backlog.addProjectTask(projectTask);
        for (String noteTemp:projectTaskRequestDto.getNotes()){
            Note note = new Note();
            log.info("note --->"+noteTemp);
            note.setNote(noteTemp);
            note.setUser(user);
            note.setProjectTask(projectTask);
            user.addNote(note);
            projectTask.addNote(note);
            // noteRepository.save(note);
        }

        for (UsefullLinkRequestDto usefullLinkTemp:projectTaskRequestDto.getUsefullLinks()){
            UsefullLink usefullLink = new UsefullLink();
            usefullLink.setComment(usefullLinkTemp.getComment());
            usefullLink.setLink(usefullLinkTemp.getLink());
            usefullLink.setUser(user);
            usefullLink.setProjectTask(projectTask);
            user.addUsefullLink(usefullLink);
            projectTask.addUsefullLink(usefullLink);
        }

   userRepository.save(user);
       // backlogRepository.save(backlog);
        return projectTask;
    }

    @Override
    public ProjectTask getProjectByProjectTaskIdentifier(String projectTaskIdentifier, Principal principal) {

      ProjectTask projectTask = projectTaskRepository.findByProjectTaskIdentifier( projectTaskIdentifier.toUpperCase());
        if(projectTask==null || !principal.getName().equals(projectTask.getBacklog().getProject().getUser().getEmail()))
            throw  new ProjectNotFoundException("no project task found with projectTaskIdentifier=\""+projectTaskIdentifier.toUpperCase()+"\"");
        return projectTask;
    }

    @Override
    public Set<ProjectTask> getAllTaskByProjectIdentifier(String projectIdentifier, Principal principal) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if(backlog==null || !principal.getName().equals(backlog.getProject().getUser().getEmail()))
            throw  new ProjectNotFoundException("no project found with projectIdentifier=\""+projectIdentifier.toUpperCase()+"\"");
return backlog.getProjectTasks();
    }

    @Override
    public void deleteProjectTaskByprojecttaskIdentifier(String projectTaskIdentifier, Principal principal) {
        ProjectTask projectTask = projectTaskRepository.findByProjectTaskIdentifier( projectTaskIdentifier.toUpperCase());
        log.info(principal+"  ");
        log.info(projectTask.getBacklog()+"  ");
        log.info(projectTask.getBacklog().getProject()+"  ");
        log.info(projectTask.getBacklog().getProject().getUser()+"  ");
        if(projectTask==null || ! principal.getName().equals(projectTask.getBacklog().getProject().getUser().getEmail()))
            throw  new ProjectNotFoundException("no project task found with projectTaskIdentifier=\""+projectTaskIdentifier+"\"");
        String projectIdentifier= projectTaskIdentifier.substring(0,projectTaskIdentifier.lastIndexOf("-"));
        Backlog backlog= backlogRepository.findByProjectIdentifier(projectIdentifier);
        Set <ProjectTask>projectTasks= backlog.getProjectTasks();
        projectTasks.remove(projectTask);
           backlogRepository.save(backlog);
       projectTaskRepository.deleteById(projectTask.getId());
//        log.info("DELETING------>"+projectTask.getProjectTaskIdentifier());
    }

    @Override
    public ProjectTask updateProjectTaskByProjectTaskIdentifier(String projectTaskIdentifie6, ProjectTaskRequestDto projectTaskRequestDto, Principal principal) {
        log.info("principal-->" +principal);
        User user = userRepository.findByEmail(principal.getName());
        ModelMapper mapper = new ModelMapper();
        ProjectTask projectTask= mapper.map(projectTaskRequestDto,ProjectTask.class);
        if(projectTask.getId()==0 && !projectTaskRepository.findById(projectTask.getId()).isPresent() )
            throw  new ProjectNotFoundException("no project task found with project id=\""+projectTask.getId()+"\"");

        ProjectTask projectTaskTemp=projectTaskRepository.findById(projectTask.getId()).get();
        if( !principal.getName().equals(projectTaskTemp.getBacklog().getProject().getUser().getEmail()))
            throw  new ProjectNotFoundException("no project task found with project id=\""+projectTask.getId()+"\"");

        for (String noteTemp:projectTaskRequestDto.getNotes()){
            Note note = new Note();
            log.info("note --->"+noteTemp);
            note.setNote(noteTemp);
            note.setUser(user);
            note.setProjectTask(projectTask);
            user.addNote(note);
            projectTask.addNote(note);
            // noteRepository.save(note);
        }

        for (UsefullLinkRequestDto usefullLinkTemp:projectTaskRequestDto.getUsefullLinks()){
            UsefullLink usefullLink = new UsefullLink();
            usefullLink.setComment(usefullLinkTemp.getComment());
            usefullLink.setLink(usefullLinkTemp.getLink());
            usefullLink.setUser(user);
            usefullLink.setProjectTask(projectTask);
            user.addUsefullLink(usefullLink);
            projectTask.addUsefullLink(usefullLink);
        }

        projectTask.setBacklog(projectTaskTemp.getBacklog());
        projectTask.setCreatedDate(projectTaskTemp.getCreatedDate());
        projectTask.setProjectTaskIdentifier(projectTaskTemp.getProjectTaskIdentifier());
        userRepository.save(user);
        return projectTask;
   }
}
