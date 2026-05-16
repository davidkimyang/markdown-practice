import 'dart:math';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:uuid/uuid.dart';

import '../models/note.dart';

class ApiService {
  ApiService({SupabaseClient? client})
      : _client = client ?? Supabase.instance.client;

  final SupabaseClient _client;
  static const _uuid = Uuid();
  static const _alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';

  Future<(String shortId, String url)> createNote(String content) async {
    final safeContent = content.trim();
    if (safeContent.isEmpty) {
      throw Exception('메모 내용이 비어 있습니다.');
    }
    if (safeContent.length > 10000) {
      throw Exception('메모는 10,000자 이하여야 합니다.');
    }

    final shortId = _generateShortId();

    await _client.from('notes').insert({
      'id': _uuid.v4(),
      'content': safeContent,
      'short_id': shortId,
    });

    final baseUrl = (dotenv.env['APP_BASE_URL'] ?? '').trim();
    final appBaseUrl = baseUrl.isEmpty ? 'https://yourapp.com' : baseUrl;

    return (shortId, '$appBaseUrl/n/$shortId');
  }

  Future<Note> getNoteByShortId(String shortId) async {
    final response = await _client
        .from('notes')
        .select()
        .eq('short_id', shortId)
        .maybeSingle();

    if (response == null) {
      throw Exception('해당 메모를 찾을 수 없습니다.');
    }

    return Note.fromJson(response);
  }

  String _generateShortId() {
    final random = Random.secure();
    return List.generate(
      6,
      (_) => _alphabet[random.nextInt(_alphabet.length)],
    ).join();
  }
}
