import { useQuery } from "@apollo/client";
import { hasFetchedExerciseVar } from "../cache";
import { GET_NEXT_EXERCISE } from "./graphql/getNextExercise.graphql";

const useFetchExercise = () => {
  const { data, loading } = useQuery(GET_NEXT_EXERCISE);

  if (data && !loading && !hasFetchedExerciseVar) {
    hasFetchedExerciseVar(true);
    // TODO: update this var correctly
  }
};
