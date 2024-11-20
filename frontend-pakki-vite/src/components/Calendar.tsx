// src/components/Calendar.tsx
import { Box, VStack, Heading, Text, useColorModeValue, Link } from '@chakra-ui/react';
import { useState } from 'react';

// Define the type for the days and courses
type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
type Course = { name: string; start: number; end: number };

// Sample schedule data with day-specific courses
const schedule: Record<Day, Course[]> = {
  Monday: [
    { name: 'Programming Languages I', start: 9, end: 11 },
    { name: 'Embedded Systems', start: 12, end: 15 },
  ],
  Tuesday: [
    { name: 'Physics I', start: 13, end: 16 },
  ],
  Wednesday: [
    { name: 'Computer Networks', start: 8, end: 10 },
    { name: 'Data Structures', start: 11, end: 14 },
  ],
  Thursday: [], // Free day
  Friday: [
    { name: 'Software Testing', start: 10, end: 12 },
    { name: 'Algorithms', start: 14, end: 17 },
  ],
};

// Helper function to get the current day name and the next weekday if no classes are found
const getCurrentOrNextClassDay = (): Day | null => {
  const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const todayIndex = new Date().getDay() - 1; // Adjust for Monday as index 0

  // Check from today onwards for the next day with classes
  for (let i = 0; i < days.length; i++) {
    const dayIndex = (todayIndex + i) % days.length;
    const dayName = days[dayIndex];

    if (schedule[dayName] && schedule[dayName].length > 0) {
      return dayName;
    }
  }
  return null; // No class day found (in case schedule is empty for all days)
};

const Calendar = () => {
  // State to control the "View More" functionality
  const [showAll, setShowAll] = useState(false);

  // Get the current or next available class day
  const classDay = getCurrentOrNextClassDay();

  // Colors based on color mode
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const headingColor = useColorModeValue('brand.700', 'brand.300');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const noClassesColor = useColorModeValue('gray.500', 'gray.400');

  // Determine days to show based on the "showAll" state
  const daysToShow = showAll ? (Object.keys(schedule) as Day[]) : classDay ? [classDay] : [];

  return (
    <Box>
      <VStack align="start" spacing={6}>
        {daysToShow.map((day) => (
          <Box key={day} p={4} w="100%" borderRadius="md" boxShadow="sm">
            <Heading size="md" color={headingColor} mb={2}>
              {day}
            </Heading>
            {schedule[day].length > 0 ? (
              schedule[day].map((course, index) => (
                <Text key={index} color={textColor}>
                  {course.name}: {course.start}:00 - {course.end}:00
                </Text>
              ))
            ) : (
              <Text color={noClassesColor}>No classes today</Text>
            )}
          </Box>
        ))}
        {/* "View More" or "View Less" link */}
        <Link color="brand.600" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'View Less' : 'View More'}
        </Link>
      </VStack>
    </Box>
  );
};

export default Calendar;
