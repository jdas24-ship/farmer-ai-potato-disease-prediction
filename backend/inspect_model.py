
import keras

model = keras.models.load_model("potato_cnn_model.keras")

print("\n--- MODEL LAYERS ---")

for layer in model.layers:
    print(layer.name, ":", layer.__class__.__name__)

print("\n--- INPUT SHAPE ---")
print(model.input_shape)

print("\n--- OUTPUT SHAPE ---")
print(model.output_shape)

print("\n--- LAST LAYER ---")
print(model.layers[-1].get_config())

print("\n--- RESCALING CONFIG ---")

for layer in model.layers:
    if layer.__class__.__name__ == "Rescaling":
        print(layer.get_config())