import React, { useState } from "react";
import { Alert, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./style";

import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playersAddByGroup";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";

type RouteParams = {
    group: string
}

export function Players() {

    const[newPlayerName, setNewPlayerName] = useState("");
    const [team, setTeam] = useState("Time A");
    const [players, setPlayers] = useState([]);

    const route = useRoute();
    const { group } = route.params as RouteParams;

    async function handleAddPlayer() {

        if(newPlayerName.trim().length === 0)
            return Alert.alert("Nova Pessoa", "Informe o nome da pessoa para adicionar.")

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {

            await playerAddByGroup(newPlayer, group)
            const players = await playersGetByGroup(group)

            console.log(players)
            
        } catch (error) {
            if(error instanceof AppError)
                Alert.alert("Nova Pessoa", error.message)
            else
                Alert.alert("nova Pessoa", "Não foi possível adicionar o jogador.")
        }
    }

    return (
        <Container>
            <Header showBackButton />

            <HighLight 
                title={group}
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input 
                onChangeText={setNewPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />
                <ButtonIcon 
                    icon="add" 
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>

                <FlatList 
                    data={["Time A", "Time B"]}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter 
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>

            </HeaderList>

            <FlatList 
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item}
                        onRemove={() => { }}
                    />
                )}
                ListEmptyComponent={() => <ListEmpty message="Não há pessoas neste time" />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                ]}
            />

            <Button 
                title="Remover Turma"
                type="SECONDARY"
            />

        </Container>
    )
}