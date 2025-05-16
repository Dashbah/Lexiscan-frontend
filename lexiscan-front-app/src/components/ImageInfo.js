import React, { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';

const ImageInfo = ({ imageUploadedUId, imageResultUId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState(null);
    const [modalImageAlt, setModalImageAlt] = useState('');
    const [previewSrc, setPreviewSrc] = useState(null);
    const [loadingModal, setLoadingModal] = useState(false);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const history = useHistory();

    const token = localStorage.getItem('token');

    // Загрузка превью результата при монтировании
    useEffect(() => {
        if (!imageResultUId) return;

        const fetchPreview = async () => {
            try {
                const response = await fetch(`http://89.169.154.190:8080/api/image/${imageResultUId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': 'image/jpeg',
                    },
                });
                if (response.ok) {
                    const blob = await response.blob();
                    const imgUrl = URL.createObjectURL(blob);
                    setPreviewSrc(imgUrl);
                } else if (response.status === 403) {
                    history.push('/login');
                } else {
                    throw new Error("Failed to fetch preview image");
                }
            } catch (e) {
                setError(e.message);
            }
        };

        fetchPreview();

        return () => {
            if (previewSrc) {
                URL.revokeObjectURL(previewSrc);
            }
        }
    }, [imageResultUId, token, history]);

    // Закрытие меню при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    // Загрузка и открытие модального окна с изображением
    const openModalWithImage = async (imageUId, altText) => {
        setLoadingModal(true);
        setError(null);
        try {
            const response = await fetch(`http://89.169.154.190:8080/api/image/${imageUId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': 'image/jpeg',
                },
            });
            if (response.ok) {
                const blob = await response.blob();
                const imgUrl = URL.createObjectURL(blob);
                setModalImageSrc(imgUrl);
                setModalImageAlt(altText);
                setModalOpen(true);
            } else if (response.status === 403) {
                history.push('/login');
            } else {
                throw new Error("Failed to fetch image");
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoadingModal(false);
            setMenuOpen(false);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        if (modalImageSrc) {
            URL.revokeObjectURL(modalImageSrc);
            setModalImageSrc(null);
            setModalImageAlt('');
        }
    };

    return (
        <div className="image-info-block" style={{ display: "inline-block", position: "relative", margin: 10 }}>
            {/* Превью результата с кликом для открытия результата */}
            {previewSrc ? (
                <div style={{ position: "relative", display: "inline-block" }}>
                    <img
                        src={previewSrc}
                        alt="Превью результата"
                        style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 8, cursor: "pointer", boxShadow: "0 0 5px rgba(0,0,0,0.3)" }}
                        onClick={() => openModalWithImage(imageResultUId, 'Результат')}
                    />
                    {/* Кнопка меню (три точки) */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(prev => !prev);
                        }}
                        style={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            background: "rgba(0,0,0,0.5)",
                            border: "none",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            userSelect: "none",
                        }}
                        aria-label="Меню"
                    >
                        ⋮
                    </button>

                    {/* Меню */}
                    {menuOpen && (
                        <div
                            ref={menuRef}
                            style={{
                                position: "absolute",
                                top: 34,
                                right: 6,
                                background: "white",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                borderRadius: 4,
                                zIndex: 1001,
                                minWidth: 140,
                            }}
                        >
                            <button
                                onClick={() => openModalWithImage(imageUploadedUId, 'Оригинал')}
                                disabled={loadingModal || !imageUploadedUId}
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    border: "none",
                                    background: "transparent",
                                    textAlign: "left",
                                    cursor: loadingModal ? "not-allowed" : "pointer",
                                    fontSize: "0.9rem",
                                }}
                            >
                                Show original image
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{
                    width: 150, height: 150, backgroundColor: "#eee",
                    display: "flex", justifyContent: "center", alignItems: "center",
                    borderRadius: 8,
                    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                    userSelect: "none"
                }}>
                    {error ? <span style={{ color: "red" }}>Ошибка</span> : "Загрузка..."}
                </div>
            )}

            {/* Ошибка под превью */}
            {error && <p style={{ color: "red", marginTop: 6 }}>{error}</p>}

            {/* Модальное окно с изображением */}
            {modalOpen && (
                <div className="modal-overlay" onClick={closeModal} style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000,
                    cursor: "pointer"
                }}>
                    <div onClick={e => e.stopPropagation()} style={{ position: "relative" }}>
                        <img
                            src={modalImageSrc}
                            alt={modalImageAlt}
                            style={{ maxHeight: "90vh", maxWidth: "90vw", borderRadius: 8, display: "block" }}
                        />
                        <button onClick={closeModal} style={{
                            position: "absolute", top: 10, right: 10, fontSize: "1.5rem", background: "transparent", border: "none", color: "white", cursor: "pointer"
                        }}>×</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageInfo;
