import { useEffect, useState } from 'react';
import {Box, Text, Spinner, Table, Thead, Tr, Th} from '@chakra-ui/react';
import axios from 'axios';


interface Reservations {
    classroomName: string;
    amountOfPeople: number;
    isReserved: boolean;

}


interface ApiReservations {
    reservations: Reservations[];

}

const Reservations = () => {
    const [apiData, setApiData] = useState<ApiReservations | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get<ApiReservations>("/public-api/reservations")
            .then((response) => {
                console.log("API response data:", response.data);
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
            <h3>Reservations</h3>
            <br></br>

            {loading ? (
                <Spinner size="xl" mt={4} />
            ) : error ? (
                <Text color="red.500" mt={4}>{error}</Text>
            ) : apiData && apiData.reservations ? (
                <div>
                    {apiData.reservations.map((reservation, index) => (
                        <div key={index}>

                            <Table variant="striped" mt={4}>
                                <Thead>
                                    <Tr>
                                        <Th><strong>Classroom:</strong> {reservation.classroomName}</Th>
                                        <Th><strong>Capacity:</strong> {reservation.amountOfPeople} people</Th>
                                        <Th><strong>Status:</strong> {reservation.isReserved ? "Reserved" : "Available"}</Th>
                                    </Tr>
                                </Thead>

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

export default Reservations;
