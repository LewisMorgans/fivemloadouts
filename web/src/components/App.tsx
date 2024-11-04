import React, { useEffect, useState } from "react";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import { Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import "./App.css"

debugData([
    {
        action: "setVisible",
        data: true,
    },
]);

type Division = { id: string; value: string };
type EUP = { id: string; value: string };
type VehicleDictionary = {
    [key: string]: {
        Division: Division[];
        EUP: { [divisionId: string]: EUP[] } | EUP[]; // Modified to handle array or object
    };
};

const App: React.FC = () => {
    const [selectedFaction, setSelectedFaction] = useState<string>("");
    const [selectedDivision, setSelectedDivision] = useState<string>("");
    const [selectedEUP, setSelectedEUP] = useState<string>("");
    const [vehicleFactions, setVehicleFactions] = useState<string[]>([]);
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [eupOptions, setEupOptions] = useState<EUP[]>([]);
    const [vehicleList, setVehicleList] = useState<VehicleDictionary | null>(null);

    const handleFactionChange = (event: SelectChangeEvent) => {
        const faction = event.target.value;
        setSelectedFaction(faction);
        setSelectedDivision("");
        setSelectedEUP("");

        if (vehicleList && vehicleList[faction]) {
            console.log("Setting divisions for faction:", faction, vehicleList[faction].Division);
            setDivisions(vehicleList[faction].Division ?? []);
            setEupOptions([]); // Clear EUP options when faction changes
        } else {
            console.log("No divisions found for faction:", faction);
            setDivisions([]);
        }
    };

    const handleDivisionChange = (event: SelectChangeEvent) => {
        const divisionId = event.target.value;
        setSelectedDivision(divisionId);
        setSelectedEUP("");

        if (vehicleList && selectedFaction) {
            const eupData = vehicleList[selectedFaction].EUP;
            
            if (Array.isArray(eupData)) {
                // Handle case for flat EUP array (e.g., "London Fire Brigade")
                console.log("Setting flat EUP options for faction:", selectedFaction, eupData);
                setEupOptions(eupData);
            } else if (eupData && eupData[divisionId]) {
                // Handle case for division-specific EUP options
                console.log("Setting EUP options for division:", divisionId, eupData[divisionId]);
                setEupOptions(eupData[divisionId]);
            } else {
                console.log("No EUP options found for division:", divisionId);
                setEupOptions([]);
            }
        }
    };

    const handleEUPChange = (event: SelectChangeEvent) => {
        setSelectedEUP(event.target.value);
    };

    const handleGetClientData = () => {
        console.log("Selected Division:", selectedDivision);
        console.log("Selected EUP:", selectedEUP);

        const data = {
            division: selectedDivision || "defaultDivision",
            eup: selectedEUP || "defaultEUP",
        };
        // console.log("Object to send:", data);
        fetchNui("spawnLoadout", data || "no data to send");
    };

    useEffect(() => {
        fetchNui<VehicleDictionary>("serviceList").then((data) => {
            if (data && typeof data === "object") {
                setVehicleList(data);
                setVehicleFactions(Object.keys(data));
                console.log("Fetched vehicle list:", data);
            } else {
                console.error("Invalid data fetched:", data);
            }
        });
    }, []);

    return (
        <div className="nui-wrapper">
            <div className="nui-form">
                <Typography variant="h5" gutterBottom marginBottom={4}>
                    Locker
                </Typography>
                <FormGroup>
                    <Stack spacing={3}>
                        {/* Faction Dropdown */}
                        <FormControl fullWidth>
                            <InputLabel id="service-faction-label" sx={{ color: "#fff" }}>
                                Faction
                            </InputLabel>
                            <Select
                                labelId="service-faction-label"
                                id="service-faction"
                                value={selectedFaction}
                                label="Faction"
                                sx={{ minWidth: 300, color: "#fff" }}
                                onChange={handleFactionChange}
                                MenuProps={{
                                    PaperProps: { sx: { bgcolor: "#282c34", color: "white" } },
                                }}
                            >
                                {vehicleFactions.map((factionName) => (
                                    <MenuItem key={factionName} value={factionName}>
                                        {factionName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Division Dropdown */}
                        <FormControl fullWidth disabled={!divisions.length}>
                            <InputLabel id="select-division-label" sx={{ color: "#fff" }}>
                                Division
                            </InputLabel>
                            <Select
                                labelId="select-division-label"
                                id="select-division"
                                value={selectedDivision}
                                label="Division"
                                sx={{ minWidth: 300, color: "#fff" }}
                                onChange={handleDivisionChange}
                                MenuProps={{
                                    PaperProps: { sx: { bgcolor: "#282c34", color: "white" } },
                                }}
                            >
                                {divisions.map((division) => (
                                    <MenuItem key={division.id} value={division.id}>
                                        {division.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* EUP Dropdown */}
                        <FormControl fullWidth disabled={!eupOptions.length}>
                            <InputLabel id="select-eup-label" sx={{ color: "#fff" }}>
                                EUP
                            </InputLabel>
                            <Select
                                labelId="select-eup-label"
                                id="select-eup"
                                value={selectedEUP}
                                label="EUP"
                                sx={{ minWidth: 300, color: "#fff" }}
                                onChange={handleEUPChange}
                                MenuProps={{
                                    PaperProps: { sx: { bgcolor: "#282c34", color: "white" } },
                                }}
                            >
                                {eupOptions.map((eup) => (
                                    <MenuItem key={eup.id} value={eup.id}>
                                        {eup.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Collect Loadout Button */}
                        <Box>
                            <Button variant="contained" fullWidth onClick={handleGetClientData}>
                                Collect Loadout
                            </Button>
                        </Box>
                    </Stack>
                </FormGroup>
            </div>
        </div>
    );
};

export default App;
