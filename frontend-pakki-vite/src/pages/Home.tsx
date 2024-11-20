// src/pages/Home.tsx
import { Box, Grid, Heading, Text, Link, VStack, useColorModeValue, LinkBox, LinkOverlay, List, ListItem } from '@chakra-ui/react';
import Calendar from '../components/Calendar';
import { useUserContext } from '../context/UserContext';
import degrees from '../data/degrees.json';
import courses from '../data/courses.json';
import students from '../data/students.json';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  const { user, isLoggedIn } = useUserContext();
  
  if (!isLoggedIn) {
    return <Text>Please log in to access your dashboard.</Text>;
  }

  const bgTop = useColorModeValue('white', 'gray.800');
  const bgBottom = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('brand.800', 'brand.200');

  // Get the degree information if the user is a student
  const degree = user?.userType === 'student' ? degrees.find((d) => d.id === user?.degreeProgramId) : null;

  // Format date of birth for display
  const formattedDOB = new Date(user?.DOB).toLocaleDateString('gb-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Determine attendance status if user is a student
  const attendanceStatus = user?.userType === 'student' && user?.attendance === 1 ? "Present" : "Absent";

  // Calculate average grade for students
  const averageGrade = 
    user.userType === 'student' && user.coursesCompleted.length > 0 
    ? user.coursesCompleted.reduce((sum, course) => sum + course.grade, 0) / user.coursesCompleted.length 
    : null;

  // Get course name by ID
  const getCourseName = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.courseName : 'Unknown Course';
  };

  const getStudentName = (studentId: string) => {
    const student = students.find((s) => s.studentId === studentId);
    return student ? student.name : 'Unknown Student';
  };

  return (
    <Box p={8} minHeight="100vh" bg={bgTop}>
      {/* Main Grid Layout */}
      <Grid templateRows="1fr 2fr" gap={8}>
        
        {/* Top Section: Credits, Personal Info, Attendance */}
        <Grid templateColumns="repeat(3, 1fr)" gap={6} p={4} bg={bgTop} borderRadius="lg" boxShadow="md">
          {/* Credits */}
          {user.userType === 'student' && (
            <VStack spacing={2} align="center">
              <Text fontSize="sm" color={textColor}>{degree?.degreeName}</Text>
              <Heading size="xl" color={textColor}>Credits</Heading>
              <Text fontSize="3xl" color={textColor}>{user.credits}</Text>
            </VStack>
          )}

          {/* Personal Info */}
          <VStack spacing={1} align="center">
            <Heading size="md" color={textColor}>{user.name}</Heading>
            <Text fontSize="sm" color={textColor}>
              {user.userType === 'student' ? `Student ID: ${user.studentId}` : `Teacher ID: ${user.teacherId}`}
            </Text>
            <Text fontSize="sm" color={textColor}>Birthdate: {formattedDOB}</Text>
            {user.userType === 'student' && <Text fontSize="sm" color={textColor}>Study Period: {user.studyPeriod}</Text>}
          </VStack>

          {/* Attendance Status (only for students) */}
          {user.userType === 'student' && (
            <VStack spacing={1} align="center">
              <Heading size="md" color={textColor}>Attendance Status</Heading>
              <Text fontSize="sm" color={textColor}>{attendanceStatus}</Text>
              <Link color="brand.600" fontSize="sm">Update Attendance</Link>
            </VStack>
          )}
        </Grid>

        {/* Bottom Section: Curriculum and Calendar */}
        <Grid templateColumns="1fr 1fr" gap={6} p={4} bg={bgBottom} borderRadius="lg" boxShadow="md">
          
          {/* Curriculum Section for Students */}
          {user.userType === 'student' && (
            <LinkBox as="section" p={4} borderRadius="md" boxShadow="md">
              <LinkOverlay as={RouterLink} to="/grades">
                <Heading size="lg" mb={2} color={textColor}>
                  G.P.A.: {averageGrade ? averageGrade.toFixed(2) : 'N/A'}
                </Heading>
                <VStack align="start" spacing={2}>
                  <Text fontSize="md" color={textColor}>Ongoing Courses:</Text>
                  {user.coursesOngoing.length > 0 ? (
                    user.coursesOngoing.map((courseId, index) => (
                      <Text key={index} fontSize="sm">
                        • {getCourseName(courseId)}
                      </Text>
                    ))
                  ) : (
                    <Text fontSize="sm" color="gray.500">No ongoing courses</Text>
                  )}
                  <Text fontSize="sm" color="gray.500">
                    Click to view detailed curriculum
                  </Text>
                </VStack>
              </LinkOverlay>
            </LinkBox>
          )}

          {/* Courses Teaching Section for Teachers */}
          {user.userType === 'teacher' && (
            <VStack spacing={4} align="stretch">
              <Heading size="lg" mb={2} color={textColor}>Courses Teaching</Heading>
              {user.coursesTeaching.map((course) => (
                <Box key={course.courseId} p={4} borderWidth="1px" borderRadius="md" boxShadow="sm">
                  <Text fontSize="md" fontWeight="bold" color={textColor}>
                    {getCourseName(course.courseId)}
                  </Text>
                  <Text fontSize="sm" color="gray.500">Enrolled Students:</Text>
                  {course.students.length > 0 ? (
                    <List spacing={2} ml={4}>
                      {course.students.map((studentId) => (
                        <ListItem key={studentId}>{getStudentName(studentId)}: {studentId}</ListItem>
                      ))}
                    </List>
                  ) : (
                    <Text fontSize="sm" color="gray.500">No students enrolled</Text>
                  )}
                </Box>
              ))}
            </VStack>
          )}

          {/* Calendar */}
          <Box>
            <Heading size="lg" mb={4} color={textColor}>Calendar</Heading>
            <Box borderRadius="md" h="200px" boxShadow="sm">
              <Calendar />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
