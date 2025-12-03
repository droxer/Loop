import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/providers/ThemeProvider';
import { Screen } from '../src/components/Screen';
import { analyzeImage } from '../src/services/ai';
import * as ImageManipulator from 'expo-image-manipulator';

export default function CameraScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [cameraReady, setCameraReady] = useState(false);
    const timerSetupRef = useRef(false);

    // Fallback: Set camera ready after 2 seconds if onCameraReady doesn't fire
    useEffect(() => {
        if (permission?.granted && !timerSetupRef.current) {
            timerSetupRef.current = true;

            const timer = setTimeout(() => {
                setCameraReady(true);
            }, 2000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [permission?.granted]);

    if (!permission) {
        return (
            <Screen>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.text }}>
                        正在检查相机权限...
                    </Text>
                </View>
            </Screen>
        );
    }

    if (!permission.granted) {
        return (
            <Screen>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center', marginBottom: 20, color: theme.colors.text }}>
                        我们需要相机权限来拍摄题目
                    </Text>
                    <TouchableOpacity onPress={requestPermission} style={[styles.button, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.text}>授权相机</Text>
                    </TouchableOpacity>
                </View>
            </Screen>
        );
    }

    const takePicture = async () => {
        if (!cameraReady) {
            Alert.alert('相机未就绪', '请稍等片刻再试');
            return;
        }

        if (!cameraRef.current) {
            Alert.alert('相机错误', '相机未正确初始化');
            return;
        }

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.7,
                base64: true,
                skipProcessing: true,
            });

            if (photo?.base64) {
                // Resize to max 1024px width/height to save tokens and bandwidth
                const manipulated = await ImageManipulator.manipulateAsync(
                    photo.uri,
                    [{ resize: { width: 1024 } }],
                    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
                );
                setPhoto(manipulated.base64 || null);
            } else {
                Alert.alert('错误', '无法获取图片数据');
            }
        } catch (error) {
            Alert.alert('拍照失败', error instanceof Error ? error.message : '未知错误');
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            setPhoto(result.assets[0].base64);
        }
    };

    const handleAnalyze = async () => {
        if (!photo) return;

        setAnalyzing(true);
        try {
            const result = await analyzeImage(photo);

            router.push({
                pathname: '/records/new',
                params: {
                    question: result.question,
                    studentAnswer: result.studentAnswer,
                    correctAnswer: result.correctAnswer,
                    subject: result.subject,
                    topic: result.topic,
                }
            });
        } catch (error) {
            console.error(error);
            Alert.alert('识别失败', error instanceof Error ? error.message : '请检查网络或 API Key');
        } finally {
            setAnalyzing(false);
        }
    };

    if (photo) {
        return (
            <Screen>
                <View style={styles.previewContainer}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${photo}` }}
                        style={styles.preview}
                        resizeMode="contain"
                    />

                    <View style={styles.controls}>
                        <TouchableOpacity
                            onPress={() => setPhoto(null)}
                            style={[styles.secondaryButton, { borderColor: theme.colors.border }]}
                            disabled={analyzing}
                        >
                            <Text style={{ color: theme.colors.text }}>重拍</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleAnalyze}
                            style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                            disabled={analyzing}
                        >
                            {analyzing ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.primaryButtonText}>开始识别</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Screen>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <CameraView
                style={{ flex: 1, width: '100%', height: '100%' }}
                ref={cameraRef}
                facing="back"
                mode="picture"
                active={true}
                enableTorch={false}
                onCameraReady={() => {
                    setCameraReady(true);
                }}
                onMountError={(error) => {
                    Alert.alert('相机错误', '无法启动相机: ' + error.message);
                }}
            />

            {/* Simulator notice */}
            {!cameraReady && (
                <View style={{
                    position: 'absolute',
                    top: '40%',
                    left: 20,
                    right: 20,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: 20,
                    borderRadius: 10,
                    alignItems: 'center'
                }}>
                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', marginBottom: 10 }}>
                        📱 相机在模拟器中不可用
                    </Text>
                    <Text style={{ color: '#ccc', fontSize: 14, textAlign: 'center' }}>
                        请使用下方的相册按钮选择图片，或在真机上测试相机功能
                    </Text>
                </View>
            )}

            {/* Overlay controls using absolute positioning */}
            <View style={styles.cameraControls}>
                {!cameraReady && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={styles.loadingText}>相机初始化中...</Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                    <Ionicons name="close" size={28} color="white" />
                </TouchableOpacity>

                <View style={styles.bottomBar}>
                    <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
                        <Ionicons name="images" size={28} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={takePicture}
                        style={[
                            styles.captureButton,
                            !cameraReady && { opacity: 0.5 }
                        ]}
                        disabled={!cameraReady}
                    >
                        <View style={styles.captureInner} />
                    </TouchableOpacity>

                    <View style={{ width: 40 }} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    cameraControls: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 60,
    },
    loadingOverlay: {
        position: 'absolute',
        top: '40%',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    loadingText: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    iconButton: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    preview: {
        flex: 1,
        borderRadius: 10,
        marginBottom: 20,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    secondaryButton: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        flex: 2,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
