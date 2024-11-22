package model;


// Reservation.java
public class Reservation {
    private String classroomName;
    private int amountOfPeople;
    private boolean isReserved;


    public Reservation(String classroomName, int amountOfPeople, boolean isReserved) {
        this.classroomName = classroomName;
        this.amountOfPeople = amountOfPeople;
        this.isReserved = isReserved;
    }

    public String getClassroomName() {
        return classroomName;
    }

    public void setClassroomName(String classroomName) {
        this.classroomName = classroomName;
    }

    public int getAmountOfPeople() {
        return amountOfPeople;
    }

    public void setAmountOfPeople(int amountOfPeople) {
        this.amountOfPeople = amountOfPeople;
    }

    public boolean isReserved() {
        return isReserved;
    }

    public void setReserved(boolean reserved) {
        isReserved = reserved;
    }
}
