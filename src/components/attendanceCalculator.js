export const calculateSubjectAttendancePercentage = (presentCount, absentCount) => {
    const totalSessions =  absentCount;
    if (totalSessions === 0) {
        return 0;
    }
    const percentage = (presentCount / totalSessions) * 100;
    return percentage.toFixed(2); // Limit to two decimal places
};

export const groupAttendanceBySubject = (subjectAttendance) => {
    const attendanceBySubject = {};

    subjectAttendance.forEach((attendance) => {
        const subName = attendance.subName.subName;
        const subId = attendance.subName._id;

        if (!attendanceBySubject[subName]) {
            attendanceBySubject[subName] = {
                present: 0,
                absent: 0,
                // sessions will be recalculated based on counts
                allData: [],
                subId: subId
            };
        }
        if (attendance.status === "Present") {
            attendanceBySubject[subName].present++;
        } else if (attendance.status === "Absent") {
            attendanceBySubject[subName].absent++;
        }
        attendanceBySubject[subName].allData.push({
            date: attendance.date,
            status: attendance.status,
        });
    });

    // Recalculate sessions as sum of present and absent counts for each subject
    Object.keys(attendanceBySubject).forEach((subject) => {
        attendanceBySubject[subject].sessions =
            attendanceBySubject[subject].present + attendanceBySubject[subject].absent;
    });
    
    return attendanceBySubject;
};

export const calculateOverallAttendancePercentage = (subjectAttendance) => {
    const groupedData = groupAttendanceBySubject(subjectAttendance);
    let totalPresent = 0;
    let totalSessions = 0;

    Object.keys(groupedData).forEach((subject) => {
        const data = groupedData[subject];
        totalPresent += data.present;
        totalSessions += data.sessions;
    });

    if (totalSessions === 0) {
        return 0;
    }

    return (totalPresent / totalSessions) * 100;
};
