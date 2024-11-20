import React from "react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useUserContext } from "../context/UserContext";
import degrees from "../data/degrees.json";
import courses from "../data/courses.json";

const Grades: React.FC = () => {
  const { user } = useUserContext();
  const userDegree = degrees.find((d) => d.id === user?.degreeProgramId);

  const getCourse = (courseId: string) => {
    return courses.find((c) => c.id === courseId);
  };

  const getCourseStatus = (courseId: string) => {
    const completedCourse = user?.coursesCompleted.find(
      (c) => c.courseId === courseId
    );
    if (completedCourse) return `Grade: ${completedCourse.grade}`;
    if (user?.coursesOngoing.includes(courseId)) return "Ongoing";
    return "";
  };

  const textColor = useColorModeValue("brand.800", "brand.200");
  const itemBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box p={8} minHeight="100vh">
      <Heading mb={4} textAlign="left">
        My Courses
      </Heading>

      <Text textAlign="left" fontSize="lg" fontWeight="semibold" color={textColor}>
        {user?.name}
      </Text>
      <Text textAlign="left" fontSize="sm" color="gray.500">
        Stuendt ID: {user?.studentId}
        </Text>

    <Text textAlign="left" fontSize="sm" color="gray.500" mb={4}>
        {userDegree?.degreeName || "Degree Courses"}
        </Text>
      <VStack spacing={4} align="stretch">
        {userDegree?.courses.map((courseId, index) => {
          const course = getCourse(courseId);
          const courseStatus = getCourseStatus(courseId);

          return (
            <Box
              key={courseId}
              p={4}
              bg={itemBg}
              borderWidth="1px"
              borderRadius="md"
              borderColor={borderColor}
              boxShadow="sm"
            >
              <Flex justify="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  {course?.courseName || "Unknown Course"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {courseStatus || "Not Started"}
                </Text>
              </Flex>
              {index < userDegree.courses.length - 1 && <Divider mt={4} />}
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Grades;
