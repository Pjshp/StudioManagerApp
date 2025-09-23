package com.example.studiomanagerapp_backend.models;

import java.time.MonthDay;
import java.time.format.DateTimeFormatter;

public class DateUtils {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("--MM-dd");

    public static String monthDayToString(MonthDay monthDay) {
        return monthDay != null ? monthDay.format(FORMATTER) : null;
    }

    public static MonthDay stringToMonthDay(String date) {
        return date != null ? MonthDay.parse(date, FORMATTER) : null;
    }
}