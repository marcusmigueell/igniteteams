import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {

    try {

        const storedPlayers = await playersGetByGroup(group);

        const playersAlreadyExists = storedPlayers.find(x => x.name === newPlayer.name);

        if(playersAlreadyExists)
            throw new AppError("Essa pessoa já esta cadastrada em um time aqui.");

        const storage = JSON.stringify([...storedPlayers, newPlayer])
        
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);

    } catch (error) {
        throw error;
    }
}