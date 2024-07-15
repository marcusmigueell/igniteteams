import React, { useState } from "react";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./style";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";

export function Players() {

    const [team, setTeam] = useState("Time A")
    const [players, setPlayers] = useState([])

    return (
        <Container>
            <Header showBackButton />

            <HighLight 
                title="Nome da Turma"
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input 
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />
                <ButtonIcon 
                    icon="add" 
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

                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>

            </HeaderList>

        </Container>
    )
}