import styled, { css } from "styled-components/native";
import { UsersThree } from "phosphor-react-native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.GRAY_600};
    padding: 24px;
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
    size: 56,
    color: theme.COLORS.GREEN_700,
    weight: "fill"
}))`
    align-self: center;
`;

export const Form = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.GRAY_700};
    flex-direction: row;
    justify-content: center;
    border-radius: 6px;
`;

export const HeaderList = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin: 32px 0 12px;
`;

export const NumberOfPlayers = styled.Text`
    ${({ theme }) => css `
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.GRAY_200};
    `}
`;