package com.personalprojecttracker.demo.service;


import com.personalprojecttracker.demo.dto.TeamProjectTasKRequestDto;
import com.personalprojecttracker.demo.exception.AlreadyAMember;
import com.personalprojecttracker.demo.exception.NotAllowed;
import com.personalprojecttracker.demo.exception.ProjectNotFoundException;
import com.personalprojecttracker.demo.exception.ProjectTaskNotFound;
import com.personalprojecttracker.demo.model.TeamBacklog;
import com.personalprojecttracker.demo.model.TeamProjectTask;
import com.personalprojecttracker.demo.model.User;
import com.personalprojecttracker.demo.model.UserTeamProjectTask;
import com.personalprojecttracker.demo.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;

@Service
@Transactional
public class TeamProjectTaskServiceImp implements  ITeamProjectTaskService{

    @Autowired
    TeamProjectMemberRepository teamProjectMemberRepository;

    @Autowired
    TeamBacklogRepository teamBacklogRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TeamProjectTaskRepository teamProjectTaskRepository;

    @Autowired
    UserTeamProjectTaskRepository userTeamProjectTaskRepository;

    @Override
    public TeamProjectTask addMyTeamProjectTask(TeamProjectTasKRequestDto teamProjectTasKRequestDto, String teamProjectIdentifier ,Principal principal) {
        TeamBacklog teamBacklog= teamBacklogRepository.findByProjectIdentifier(teamProjectIdentifier.toUpperCase());
          User user = userRepository.findByEmail(principal.getName());

        if(teamBacklog==null || teamProjectMemberRepository.findByUserEmailAndTeamProjectProjectIdentifier(principal.getName(),teamProjectIdentifier.toUpperCase())==null)
            throw new ProjectNotFoundException("no such team project found for user");


        teamBacklog.setProjectTaskSequence(teamBacklog.getProjectTaskSequence()+1);
        ModelMapper mapper = new ModelMapper();
        TeamProjectTask teamProjectTask=mapper.map(teamProjectTasKRequestDto,TeamProjectTask.class);
        teamProjectTask.setProjectTaskIdentifier(teamProjectIdentifier.toUpperCase()+"-"+teamBacklog.getProjectTaskSequence());
        teamProjectTask.setTeamBacklog(teamBacklog);
        teamBacklog.addProjectTask(teamProjectTask);
        teamProjectTask.setCreatedBy(user);
        user.addCreatedTeamProjectTask(teamProjectTask);
        //teamProjectTask.setStatus("TO_DO");

        UserTeamProjectTask userTeamProjectTask = new UserTeamProjectTask();
        userTeamProjectTask.setUser(user);
        userTeamProjectTask.setTeamProjectTask(teamProjectTask);
        user.addUserTeamProjectTask(userTeamProjectTask);
        teamProjectTask.addUserTeamProjectTask(userTeamProjectTask);


        teamBacklogRepository.save(teamBacklog);
        userRepository.save(user);
        return teamProjectTask;
    }

    @Override
    public TeamProjectTask updateTeamProjectTask(TeamProjectTasKRequestDto teamProjectTasKRequestDto,   String projectTaskIdentifier, Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        UserTeamProjectTask userTeamProjectTask=userTeamProjectTaskRepository.findByUserEmailAndTeamProjectTaskProjectTaskIdentifier(principal.getName(),projectTaskIdentifier.toUpperCase());
        if(userTeamProjectTask==null)
            throw new ProjectTaskNotFound("no such task found for the user");

        TeamProjectTask teamProjectTask = teamProjectTaskRepository.findByProjectTaskIdentifier(projectTaskIdentifier);

        String teamProjectIdentifier=projectTaskIdentifier.substring(0,projectTaskIdentifier.lastIndexOf("-"));
        if(!teamProjectTask.getCreatedBy().getEmail().equals(principal.getName())  && !teamProjectMemberRepository.findByUserEmailAndTeamProjectProjectIdentifier(principal.getName(),teamProjectIdentifier.toUpperCase()).getLeader())
            throw new NotAllowed("user not allowed to delete task");

        teamProjectTask.setEndDate(teamProjectTasKRequestDto.getEndDate());
        teamProjectTask.setStartDate(teamProjectTasKRequestDto.getStartDate());
        teamProjectTask.setPreference(teamProjectTasKRequestDto.getPreference());
        teamProjectTask.setStatus(teamProjectTasKRequestDto.getStatus());
        teamProjectTask.setSummary(teamProjectTasKRequestDto.getSummary());
//        teamProjectTask.set
        teamProjectTaskRepository.save(teamProjectTask);
        return teamProjectTask;
    }

    @Override
    public TeamProjectTask addMeToExistingTeamProjectTask(String teamProjectTaskIdentifier, Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        String teamProjectIdetifier=teamProjectTaskIdentifier.substring(0,teamProjectTaskIdentifier.lastIndexOf("-"));
        if(teamProjectMemberRepository.findByUserEmailAndTeamProjectProjectIdentifier(principal.getName(),teamProjectIdetifier.toUpperCase())==null)
            throw new ProjectNotFoundException("no such team project found for user");
        TeamProjectTask teamProjectTask= teamProjectTaskRepository.findByProjectTaskIdentifier(teamProjectTaskIdentifier);
        if(teamProjectTask==null)
          throw new ProjectTaskNotFound("no such task found for the user");
        if(userTeamProjectTaskRepository.findByUserEmailAndTeamProjectTaskProjectTaskIdentifier(principal.getName(),teamProjectTaskIdentifier)!=null)
           throw new AlreadyAMember("user already in the task");
        UserTeamProjectTask userTeamProjectTask = new UserTeamProjectTask();
        userTeamProjectTask.setUser(user);
        userTeamProjectTask.setTeamProjectTask(teamProjectTask);
        user.addUserTeamProjectTask(userTeamProjectTask);
        teamProjectTask.addUserTeamProjectTask(userTeamProjectTask);

        teamProjectTaskRepository.save(teamProjectTask);
        userRepository.save(user);

        return teamProjectTask;
    }

    @Override
    public TeamProjectTask addMembersToExistingTeamProjectTask(String teamProjectTaskIdentifier, Principal principal, String[] membersEmail) {
        return null;
    }

    @Override
    public void removeMeFromExistingTeamProjectTask(String projectTaskIdentifier, Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        UserTeamProjectTask userTeamProjectTask=userTeamProjectTaskRepository.findByUserEmailAndTeamProjectTaskProjectTaskIdentifier(principal.getName(),projectTaskIdentifier.toUpperCase());
        if(userTeamProjectTask==null)
            throw new ProjectTaskNotFound("no such task found for the user");

        userTeamProjectTaskRepository.delete(userTeamProjectTask);
    }
}
