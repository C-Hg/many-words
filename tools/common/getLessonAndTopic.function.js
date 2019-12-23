const getLessonAndTopic = path => {
  const lessonRegex = /\w+(?=\/[\w]+\.md)/gi;
  const topicRegex = /\w+(?=\/[\w]+\/[\w]+\.md)/gi;
  const matchedLesson = path.match(lessonRegex);
  const matchedTopic = path.match(topicRegex);

  if (lesson === null || topic === null) {
    console.error(
      "\033[1;31m" +
        `Error : cannot parse lesson or topic ${lesson}, ${topic}` +
        "\033[0;0m"
    );
  }

  return { lesson: matchedLesson[0], topic: matchedTopic[0]};
};

export default getLessonAndTopic;
