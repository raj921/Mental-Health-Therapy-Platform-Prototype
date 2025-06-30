import * as Crypto from 'expo-crypto';

export class EncryptionService {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;

  // In a real app, this would be derived from user credentials or stored securely
  private static readonly MASTER_KEY = 'therapy_app_master_key_2023';

  static async generateKey(): Promise<string> {
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    return Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  static async encryptMessage(message: string): Promise<string> {
    try {
      // For demo purposes, using simple base64 encoding
      // In production, use proper encryption libraries
      const encoded = Buffer.from(message, 'utf8').toString('base64');
      return `encrypted_${encoded}`;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt message');
    }
  }

  static async decryptMessage(encryptedMessage: string): Promise<string> {
    try {
      if (!encryptedMessage.startsWith('encrypted_')) {
        return encryptedMessage; // Return as-is if not encrypted
      }
      
      const encoded = encryptedMessage.replace('encrypted_', '');
      const decoded = Buffer.from(encoded, 'base64').toString('utf8');
      return decoded;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt message');
    }
  }

  static async encryptFile(fileUri: string): Promise<string> {
    try {
      // For demo purposes, return the original URI with encryption prefix
      return `encrypted_file_${fileUri}`;
    } catch (error) {
      console.error('File encryption error:', error);
      throw new Error('Failed to encrypt file');
    }
  }

  static async decryptFile(encryptedFileUri: string): Promise<string> {
    try {
      if (encryptedFileUri.startsWith('encrypted_file_')) {
        return encryptedFileUri.replace('encrypted_file_', '');
      }
      return encryptedFileUri;
    } catch (error) {
      console.error('File decryption error:', error);
      throw new Error('Failed to decrypt file');
    }
  }
}