import { StockCarsProvider } from "@/contexts/staff/CarSearchContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { SlidersHorizontal, X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

const SearchLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const form = useForm();
  return (
    <FormProvider {...form}>
      <StockCarsProvider>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerTintColor: colors.primary,
            headerStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "検索",
              headerRight: () => (
                <TouchableOpacity onPress={() => router.push("/search/filter")}>
                  <SlidersHorizontal size={24} color={colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="filter"
            options={{
              title: "検索",
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
      </StockCarsProvider>
    </FormProvider>
  );
};

export default SearchLayout;
