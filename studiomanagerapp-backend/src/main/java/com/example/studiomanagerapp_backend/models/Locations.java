package com.example.studiomanagerapp_backend.models;

public enum Locations {
    WOJSKA_POLSKIEGO_23_BDG("ul. Wojska Polskiego 23, Bydgoszcz"),
    DWORCOWA_15_BDG("ul. Dworcowa 15, Bydgoszcz"),
    GDANSKA_100_BDG("ul. Gdańska 100, Bydgoszcz");

    private final String address;

    Locations(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    @Override
    public String toString() {
        return address; // 🔹 dzięki temu np. w dropdownie od razu pokaże się adres
    }
}
