# Use a base image with Python for Flask
FROM ubuntu:22.04

# Set up working directory
WORKDIR /app

# Install necessary system dependencies
RUN apt-get update && \
    apt-get install -y curl wget unzip python3 python3-pip android-sdk adb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set PATH environment variable to include Python
ENV PATH="${PATH}:/usr/bin/python3"

# Set environment variables for Android SDK
ENV ANDROID_HOME /usr/lib/android-sdk
ENV ANDROID_SDK_ROOT ${ANDROID_HOME}/cmdline-tools
ENV PATH $PATH:$ANDROID_HOME/tools


# Download and install Android SDK
RUN wget --quiet --output-document=android-sdk.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
RUN unzip -d $ANDROID_HOME android-sdk.zip && \
    #cd into the $ANDROID_HOME/cmdline-tools directory and copy everythin inside the directory to a new latest directory needed for --sdk_root
    mkdir $ANDROID_HOME/latest && \
    cp -r $ANDROID_HOME/cmdline-tools/* $ANDROID_HOME/latest/ && \
    rm -rf $ANDROID_HOME/cmdline-tools/* && \
    mv $ANDROID_HOME/latest $ANDROID_HOME/cmdline-tools/ && \
    rm android-sdk.zip

# Set PATH for sdkmanager
ENV PATH="${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin"

# Update package lists and install OpenJDK 17
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-arm64
ENV PATH=$JAVA_HOME/bin:$PATH

# Install required packages for AVD
RUN yes | sdkmanager --licenses
# "platforms;android-31"
RUN sdkmanager --install "platform-tools" "build-tools;34.0.0" "platforms;android-34" 

# Download and extract the emulator
# replace with wget url
COPY docker-resources/emulator-linux_aarch64.zip emulator.zip  
RUN mkdir $ANDROID_HOME/emulator \
    && unzip emulator.zip -d /tmp \
    && mv /tmp/emulator/* $ANDROID_HOME/emulator \
    && rm -rf /tmp/emulator emulator.zip

# Copy package.xml
COPY docker-resources/package.xml $ANDROID_HOME/emulator

# Add Emulator to the PATH
ENV PATH=$ANDROID_HOME/emulator:$PATH

# # Install emulator package
# RUN sdkmanager "emulator"

# Download the required images
RUN sdkmanager "system-images;android-34;default;arm64-v8a"

# Create AVD
RUN avdmanager create avd -n Pixel-3a-14 -k "system-images;android-34;default;arm64-v8a" --device "pixel_3a"

# Run AVD 
# RUN emulator @Pixel-3a-14 -no-window -no-audio

# Install Flask dependencies
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the backend application
COPY . .

# Define entry point
CMD ["python3", "server.py"]