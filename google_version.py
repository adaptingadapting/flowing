#!/usr/bin/python3

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import cv2

img = cv2.imread("image.jpg")
"""
cv2.imshow("window", img)
cv2.waitKey()
"""

# STEP 2: Create an HandLandmarker object.
base_options = python.BaseOptions(model_asset_path='hand_landmarker.task')
options = vision.HandLandmarkerOptions(base_options=base_options,
                                       num_hands=2)
detector = vision.HandLandmarker.create_from_options(options)

# STEP 3: Load the input image.
image = mp.Image.create_from_file("image.jpg")

# STEP 4: Detect hand landmarks from the input image.
detection_result = detector.detect(image)


"""
# STEP 5: Process the classification result. In this case, visualize it.
annotated_image = draw_landmarks_on_image(image.numpy_view(), detection_result)
cv2.imshow("window", cv2.cvtColor(annotated_image, cv2.COLOR_RGB2BGR))
cv2.waitKey()
"""

tensor = []

for landmark in detection_result.hand_landmarks:
    for landmark in landmark:
        tensor.append(landmark.x)
        tensor.append(landmark.y)
        tensor.append(landmark.z)

for landmark in detection_result.hand_world_landmarks:
    for landmark in landmark:
        tensor.append(landmark.x)
        tensor.append(landmark.y)
        tensor.append(landmark.z)

tensor.append(detection_result.handedness[0][0].index)
tensor.append(detection_result.handedness[0][0].score)

for element in tensor:
    print(element)


cv2.destroyAllWindows()
