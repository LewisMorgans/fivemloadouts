ServiceDictionary = {
    ["Metropolitan Police Service"] = {
        ["Division"] = {
            { id = "erpt", value = "ERPT" },
            { id = "rptc", value = "RPTC" },
            { id = "mo19", value = "MO19" },
        },
        ["EUP"] = {
            ["erpt"] = {
                { id = "erptLS", value = "ERPT Long sleeve" },
                { id = "erptSS", value = "ERPT Short sleeve" },
                { id = "erptHVO", value = "ERPT Highvis open" },
                { id = "erptHVC", value = "ERPT Highvis closed" }
            },
            ["rptc"] = {
                { id = "rptcLS", value = "RPTC Long sleeve" },
                { id = "rptcSS", value = "RPTC Short sleeve" },
                { id = "rptcHVO", value = "RPTC Highvis open" },
                { id = "rptcHVC", value = "RPTC Highvis closed" }
            },
            ["mo19"] = {
                { id = "mo19LS", value = "MO19 Long sleeve" },
                { id = "mo19SS", value = "MO19 Short sleeve" },
                { id = "mo19RC", value = "MO19 Rain coat" },
                { id = "mo19T", value = "MO19 Tactical" }
            }
        }
    },
    ["London Ambulance Service"] = {
        ["Division"] = {
            { id = "dca", value = "DCA" },
            { id = "hart", value = "HART" },
            { id = "hems", value = "HEMS" },
        },
        ["EUP"] = {
            ["dca"] = {
                { id = "spara", value = "Student Paramedic" },
                { id = "para", value = "Paramedic" },
                { id = "app", value = "Advanced Paramedic Practitioner" }
            },
            ["hart"] = {
                { id = "hartRtc", value = "RTC" },
                { id = "hartSar", value = "Search and Rescue" },
                { id = "hartFba", value = "Fire BA" }
            },
            ["hems"] = {
                { id = "hemsDoc", value = "Doctor" },
                { id = "hemsPara", value = "Paramedic" },
                { id = "hemsPilot", value = "Pilot" }
            }
        }
    },
    ["London Fire Brigade"] = {
        ["Division"] = {
            { id = "ff", value = "Firefighter" }
        },
        ["EUP"] = {
            ["ff"] = {
                { id = "lfbBA", value = "BA Turnout" },
                { id = "lfbt", value = "Turnout" },
                { id = "lfbRtc", value = "RTC Turnout" },
                { id = "lfbMarine", value = "Marine Turnout" }
            }
        }
    },
    ["Civillian"] = {
        ["Division"] = {
            { id = "civ1", value = "Level 1" },
            { id = "civ2", value = "Level 2" },
            { id = "civ3", value = "Level 3" },
            { id = "civ4", value = "Level 4" }
        },
        ["EUP"] = {}
    }
}
