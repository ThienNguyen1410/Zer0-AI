import { StyleSheet, Text, View, Platform } from "react-native";
import { colors } from "../../utils/colors";

interface FloatCardProps {
    shadeNumber?: string;
    hexCode?: string;
    backgroundColor?: string;
}

export default function FloatCard({
    hexCode = "#F1F1F1",
    backgroundColor = "#F1F1F1",
}: FloatCardProps) {
    return (
        <View style={styles.cardContainer}>
            <View style={[styles.card, { backgroundColor }]}>
                <Text style={styles.hexCode}>{hexCode}</Text>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: colors.transparent,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 5,
    },
    card: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: colors.red,
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    hexCode: {
        fontSize: 12,
        fontWeight: '500',
        color: '#374151',
    },
});