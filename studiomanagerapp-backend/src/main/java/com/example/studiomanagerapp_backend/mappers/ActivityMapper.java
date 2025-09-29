package com.example.studiomanagerapp_backend.mappers;

import com.example.studiomanagerapp_backend.dtos.activity.ActivityDto;
import com.example.studiomanagerapp_backend.models.Activity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ActivityMapper {

    ActivityDto toActivityDto(Activity activity);

    Activity toActivity(ActivityDto activityDto);

    List<ActivityDto> toActivityDtoList(List<Activity> activities);

    List<Activity> toActivityList(List<ActivityDto> dtos);

    Activity updateActivityFromDto(ActivityDto dto, @MappingTarget Activity activity);
}
