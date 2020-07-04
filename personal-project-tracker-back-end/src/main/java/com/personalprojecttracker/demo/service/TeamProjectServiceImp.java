package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.dto.TeamProjectRequestDto;
import com.personalprojecttracker.demo.model.TeamProject;
import com.personalprojecttracker.demo.model.TeamProjectMember;
import com.personalprojecttracker.demo.model.User;
import com.personalprojecttracker.demo.repository.TeamProjectRepository;
import com.personalprojecttracker.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@Slf4j
public class TeamProjectServiceImp implements  ITeamProjectService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    TeamProjectRepository teamProjectRepository;

    @Override
    public TeamProject addTeamProject(TeamProjectRequestDto teamProjectRequestDto, Principal principal) {
        log.info(principal.toString());
        log.info(principal.getName());

        User user = userRepository.findByEmail(principal.getName());
        ModelMapper mapper = new ModelMapper();
        //mapper.getConfiguration().setMatchingStrategy(MatchingStrategy.)
      TeamProject teamProject= mapper.map(teamProjectRequestDto,TeamProject.class);
      teamProject.setCreatedBy(user);
      user.addCreatedTeamProject(teamProject);

      for (String leaders : teamProjectRequestDto.getLeadersEmail()){
          User leader = userRepository.findByEmail(leaders);
          TeamProjectMember teamProjectMember = new TeamProjectMember();
          if(leader ==null || teamProject.getTeamProjectMembers().contains(leader))
              continue;
          teamProjectMember.setLeader(true);
          teamProjectMember.setTeamProject(teamProject);
          teamProjectMember.setUser(leader);
          teamProject.addTeamProjectMember(teamProjectMember);
          leader.addTeamProjectMember(teamProjectMember);
          userRepository.save(leader);

      }

        for (String leaders : teamProjectRequestDto.getMembersEmail()){
            User member = userRepository.findByEmail(leaders);
            TeamProjectMember teamProjectMember = new TeamProjectMember();
            if(member ==null || teamProject.getTeamProjectMembers().contains(member))
                continue;
            teamProjectMember.setLeader(false);
            teamProjectMember.setTeamProject(teamProject);
            teamProjectMember.setUser(member);
            teamProject.addTeamProjectMember(teamProjectMember);
            member.addTeamProjectMember(teamProjectMember);
            userRepository.save(member);
}

        userRepository.save(user);
        teamProjectRepository.save(teamProject);
        return teamProject;
    }

    @Override
    public TeamProject getTeamProject(String teamProjectIdentifier, Principal principal) {
        return null;
    }
}
