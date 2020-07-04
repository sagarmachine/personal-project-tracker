package com.personalprojecttracker.demo.controller;

import com.personalprojecttracker.demo.dto.TeamProjectRequestDto;
import com.personalprojecttracker.demo.service.IBindingResultErrorService;
import com.personalprojecttracker.demo.service.ITeamProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/teamproject")
public class TeamProjectController {

    @Autowired
    ITeamProjectService teamProjectService;

    @Autowired
    IBindingResultErrorService bindingResultErrorService;

    @PostMapping("/")
    public ResponseEntity<?>  addTeamProject(@Valid @RequestBody TeamProjectRequestDto teamProjectRequestDto,
                                             BindingResult bindingResult,Principal principal){

        if(bindingResult.hasErrors())
            bindingResultErrorService.getErrorResponse(bindingResult);
        return new ResponseEntity<>(teamProjectService.addTeamProject(teamProjectRequestDto,principal), HttpStatus.ACCEPTED);

    }

}
