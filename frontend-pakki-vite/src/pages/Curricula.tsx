import { useEffect, useState } from 'react';
import { Box, Heading, Text, Spinner, Table, Thead, Tbody, Tr, Th, Td} from '@chakra-ui/react';
import axios from 'axios';


interface Degree {
    id: number;
    name: string;
    level: string;
    years: number;
    credits: number;
    curriculum: Curriculum[];

}
interface Curriculum {
    course_id: string;
    course_name: string;
    credits: number;
}

interface ApiData {
    degrees: Degree[];

}

const Curricula = () => {
    const [apiData, setApiData] = useState<ApiData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get<ApiData>('/public-api')
            .then((response) => {
                setApiData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError('Error loading data');
                setLoading(false);
            });
    }, []);

    return (
        <Box
            textAlign="center"
            fontSize="xl"
            p={4}
            minHeight="100vh"
            width="100%"
        >


            {loading ? (
                <Spinner size="xl" mt={4} />
            ) : error ? (
                <Text color="red.500" mt={4}>{error}</Text>
            ) : apiData && apiData.degrees ? (
                <div>
                    {apiData.degrees.map((degree, index) => (
                        <div key={index}>
                          <Heading><h2>{degree.name}</h2></Heading>
                            <Table variant="striped" mt={4}>
                                <Thead>
                                    <Tr>
                            <Th><strong>Level:</strong> {degree.level}</Th>
                            <Th><strong>Duration:</strong> {degree.years} years</Th>
                            <Th><strong>Credits:</strong> {degree.credits}</Th>
                                    </Tr>
                                </Thead>

                                </Table>
                            <br></br>
                            <h3>Curriculum:</h3>
                            <Table variant="striped" mt={4} border="1px" borderColor="gray.200">
                                <Thead>
                                    <Tr>
                                        <Th>Course</Th>
                                        <Th>Credits</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {degree.curriculum.map((course) => (
                                        <Tr key={course.course_id}>
                                            <Td>{course.course_name}</Td>
                                            <Td>{course.credits}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </div>
                    ))}
                </div>
            ) : (
                <Text mt={4}>No data available.</Text>
            )}
        </Box>
    );
};

export default Curricula;
