local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

Citizen.CreateThread(function()
  RegisterKeyMapping('spawnCar', 'Spawn Car', 'keyboard', Config.SpawnKey)
end)

RegisterNuiCallback('serviceList', function(data, cb)
  debugPrint('VEHICLE LIST Data sent by React', json.encode(data))
  cb(ServiceDictionary)
end)

RegisterCommand('spawnCar', function()
  toggleNuiFrame(true)
end, false)

RegisterNUICallback('spawnLoadout', function(data, cb)
  removeWeapons() -- remove ped weapons
  local division = data.division or "default"
  local eupID = data.eup or "default"
  local loadouts = LoadoutsDictionary["loadouts"]
  local weaponsToGive = loadouts[division] or loadouts["default"]

  for _, weaponArray in ipairs(weaponsToGive) do
      for _, weaponName in ipairs(weaponArray) do
          giveWeapons(weaponName)
      end
  end

  -- EUP
  Citizen.Wait(200)
  setOutfit(eupID)

end)


function setOutfit(eupID)
    local outfit = EupDictionary['eup']
    local selectedEUP = outfit[eupID]

    local ped = PlayerPedId()

    debugPrint(json.encode(eupID))
    debugPrint(json.encode(selectedEUP.components))

    RequestModel(selectedEUP.ped)

    while not HasModelLoaded(selectedEUP.ped) do
        Wait(0)
    end

    ped = PlayerPedId()

    for _, comp in ipairs(selectedEUP.components) do
       SetPedComponentVariation(ped, comp[1], comp[2] - 1, comp[3] - 1, 0)
    end

    -- for _, comp in ipairs(selectedEUP.props) do
    --     if comp[2] == 0 then
    --         ClearPedProp(ped, comp[1])
    --     else
    --         SetPedPropIndex(ped, comp[1], comp[2] - 1, comp[3] - 1, true)
    --     end
    -- end


  local categoryOutfits = {}

  for name, outfit in pairs(outfits) do
      if not categoryOutfits[outfit.category] then
          categoryOutfits[outfit.category] = {}
      end

      categoryOutfits[outfit.category][name] = outfit
  end
end
