def temperature_converter():
    print("Temperature Converter")
    print("-" * 20)
    
    # Get temperature input
    try:
        temperature = float(input("Enter temperature: "))
    except ValueError:
        print("Please enter a valid number!")
        return
    
    # Get conversion choice
    print("\nChoose conversion:")
    print("1. Celsius to Fahrenheit")
    print("2. Fahrenheit to Celsius")
    
    choice = input("Enter choice (1 or 2): ")
    
    if choice == "1":
        # Celsius to Fahrenheit: F = (C × 9/5) + 32
        fahrenheit = (temperature * 9/5) + 32
        print(f"{temperature}°C = {fahrenheit}°F")
    elif choice == "2":
        # Fahrenheit to Celsius: C = (F - 32) × 5/9
        celsius = (temperature - 32) * 5/9
        print(f"{temperature}°F = {celsius:.1f}°C")
    else:
        print("Invalid choice! Please enter 1 or 2.")

# Run the program
if __name__ == "__main__":
    temperature_converter()