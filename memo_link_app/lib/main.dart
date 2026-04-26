import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'screens/home_screen.dart';
import 'screens/view_screen.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: '.env');

  await Supabase.initialize(
    url: dotenv.env['SUPABASE_URL'] ?? '',
    anonKey: dotenv.env['SUPABASE_ANON_KEY'] ?? '',
  );

  runApp(const ProviderScope(child: MemoLinkApp()));
}

class MemoLinkApp extends StatelessWidget {
  const MemoLinkApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Memo Link',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
      onGenerateRoute: (settings) {
        final routeName = settings.name ?? '/';
        final segments = Uri.parse(routeName).pathSegments;

        if (segments.length == 2 && segments.first == 'n') {
          return MaterialPageRoute<void>(
            builder: (_) => ViewScreen(shortId: segments[1]),
          );
        }

        return MaterialPageRoute<void>(builder: (_) => const HomeScreen());
      },
    );
  }
}
