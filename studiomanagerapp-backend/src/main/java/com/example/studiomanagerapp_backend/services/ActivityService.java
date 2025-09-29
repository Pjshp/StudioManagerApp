package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.models.Activity;
import com.example.studiomanagerapp_backend.repositories.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity getActivityById(Integer id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Activity not found with id: " + id));
    }

    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity updateActivity(Integer id, Activity updatedActivity) {
        Activity activity = getActivityById(id);
        activity.setName(updatedActivity.getName());
        activity.setDescription(updatedActivity.getDescription());
        activity.setParticipantLimit(updatedActivity.getParticipantLimit());
        activity.setRoomType(updatedActivity.getRoomType());
        return activityRepository.save(activity);
    }

    public void deleteActivity(Integer id) {
        if (!activityRepository.existsById(id)) {
            throw new IllegalArgumentException("Activity not found with id: " + id);
        }
        activityRepository.deleteById(id);
    }
}
