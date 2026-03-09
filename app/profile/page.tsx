'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { FaCamera, FaArrowRightFromBracket, FaDownload, FaUser, FaChevronRight, FaPencil } from 'react-icons/fa6';

// Initialize Supabase client
const supabase = createClient(
  'https://mpsnwijabfingujzirri.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wc253aWphYmZpbmd1anppcnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDUzNzIsImV4cCI6MjA4MzQyMTM3Mn0.RTNnZHJRnYjoeX9faOi324CbooNxNaW6Fm2xJrV609M'
);

export default function ProfilePage() {
  const router = useRouter();
  
  // State
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Track which field is currently being edited
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // Profile Data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [email, setEmail] = useState('');

  // User Downloads
  const [savedProducts, setSavedProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // 1. Get Logged in User
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        router.push('/login');
        return;
      }
      
      setUser(session.user);
      setEmail(session.user.email || '');

      // 2. Fetch Profile Details
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileData && !profileError) {
        setFirstName(profileData.first_name || '');
        setLastName(profileData.last_name || '');
        setBio(profileData.bio || '');
        setGender(profileData.gender || '');
        setBirthday(profileData.birthday || '');
        setPhoneNumber(profileData.phone_number || '');
        setAvatarUrl(profileData.avatar_url || '');
      }

      // 3. Fetch Saved Downloads
      const { data: downloadsData, error: downloadsError } = await supabase
        .from('user_downloads')
        .select(`
          id,
          downloaded_at,
          products (
            id,
            title,
            image_url,
            item_code,
            collection_type
          )
        `)
        .eq('user_id', session.user.id)
        .order('downloaded_at', { ascending: false });

      if (downloadsData && !downloadsError) {
        setSavedProducts(downloadsData);
      }

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          bio: bio,
          gender: gender,
          birthday: birthday,
          phone_number: phoneNumber,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      alert('Profile updated successfully!');
      setEditingField(null); // Close any open edits on save
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload image
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const newAvatarUrl = publicUrlData.publicUrl;

      // Update Profile table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;
      
      setAvatarUrl(newAvatarUrl);
      
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Helper function to render a row that toggles between text and an input
  const renderEditableRow = (
    label: string, 
    fieldKey: string, 
    value: string, 
    setter: (val: string) => void, 
    inputType: 'text' | 'date' | 'select' = 'text',
    options: string[] = []
  ) => {
    const isEditing = editingField === fieldKey;

    return (
      <div className="flex justify-between items-center p-4 border-b border-white/5 last:border-0 min-h-[56px]">
        <span className="text-sm text-zinc-300 w-1/3">{label}</span>
        <div className="flex items-center w-2/3 justify-end">
          {isEditing ? (
            inputType === 'select' ? (
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="bg-transparent text-right text-sm text-white outline-none w-full appearance-none"
                style={{ direction: 'rtl' }}
              >
                <option value="" disabled className="bg-[#1a1a1a]">Select</option>
                {options.map(opt => (
                  <option key={opt} value={opt} className="bg-[#1a1a1a]">{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={inputType}
                value={value}
                onChange={(e) => setter(e.target.value)}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                autoFocus
                className="bg-transparent border-b border-[#B08038] text-right text-sm text-white outline-none w-full pb-1"
                style={inputType === 'date' ? { colorScheme: 'dark' } : {}}
              />
            )
          ) : (
            <div 
              className="flex items-center cursor-pointer group justify-end w-full"
              onClick={() => setEditingField(fieldKey)}
            >
              <span className={`text-sm text-right truncate ${value ? 'text-white' : 'text-[#B08038]'}`}>
                {value || 'Set Now'}
              </span>
              <FaChevronRight className="ml-3 text-zinc-600 text-xs group-hover:text-[#B08038] transition-colors" />
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/10 border-t-[#B08038] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-20 px-6 lg:px-16 font-['Prompt']">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Column - Profile Info & Edit */}
        <div className="w-full lg:w-1/3 flex flex-col">
          
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            
            {/* Avatar Centered */}
            <div className="flex flex-col items-center justify-center pt-4 pb-6 border-b border-white/5">
              <div className="relative group mb-3">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-800 shadow-xl flex items-center justify-center border border-white/10">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="text-4xl text-zinc-500" />
                  )}
                </div>
                {/* Upload Button Overlay */}
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity duration-300">
                  <FaCamera className="text-white text-xl" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleAvatarUpload} 
                    disabled={uploading}
                    className="hidden" 
                  />
                </label>
              </div>
              <label className="text-zinc-400 text-sm flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <FaPencil className="text-xs" /> Edit Profile Picture
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                  disabled={uploading}
                  className="hidden" 
                />
              </label>
            </div>

            {/* List Group 1: Name & Bio */}
            <div className="bg-white/5 rounded-lg border border-white/5 overflow-hidden">
              {renderEditableRow('First Name', 'firstName', firstName, setFirstName)}
              {renderEditableRow('Last Name', 'lastName', lastName, setLastName)}
              {renderEditableRow('Bio', 'bio', bio, setBio)}
            </div>

            {/* List Group 2: Gender & Birthday */}
            <div className="bg-white/5 rounded-lg border border-white/5 overflow-hidden">
              {renderEditableRow('Gender', 'gender', gender, setGender, 'select', ['Male', 'Female', 'Other'])}
              {renderEditableRow('Birthday', 'birthday', birthday, setBirthday, 'date')}
            </div>

            {/* List Group 3: Contact */}
            <div className="bg-white/5 rounded-lg border border-white/5 overflow-hidden">
              {renderEditableRow('Phone', 'phone', phoneNumber, setPhoneNumber)}
              <div className="flex justify-between items-center p-4 border-b border-white/5 last:border-0 min-h-[56px]">
                <span className="text-sm text-zinc-300 w-1/3">Email</span>
                <div className="flex items-center w-2/3 justify-end">
                  <span className="text-sm text-zinc-500 truncate">{email}</span>
                  <FaChevronRight className="ml-3 text-zinc-600 text-xs opacity-0" />
                </div>
              </div>
            </div>

            {/* Save & Sign Out Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button 
                type="button"
                onClick={handleSignOut}
                className="text-zinc-500 text-xs flex items-center gap-2 hover:text-white transition-colors"
              >
                <FaArrowRightFromBracket /> Sign Out
              </button>
              
              <button 
                type="submit" 
                disabled={saving}
                className="bg-[#B08038] text-white px-6 py-2 rounded-sm text-xs font-medium tracking-wide hover:bg-[#8f662a] transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>

          </form>
        </div>

        {/* Right Column - Saved Downloads */}
        <div className="w-full lg:w-2/3 lg:pl-12 lg:border-l border-white/10 mt-10 lg:mt-0">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl md:text-2xl font-medium tracking-wide text-white uppercase">Saved Textures</h2>
            <span className="text-zinc-500 text-xs">{savedProducts.length} Items</span>
          </div>

          {savedProducts.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-sm p-12 text-center flex flex-col items-center">
              <FaDownload className="text-4xl text-zinc-600 mb-4" />
              <h3 className="text-white font-medium mb-2">No textures saved yet.</h3>
              <p className="text-zinc-500 text-sm max-w-sm mb-6">
                Explore our collections and click "Favorite" or "Download Simple" to save materials to your project board.
              </p>
              <Link href="/introduction" className="bg-[#B08038] text-white px-8 py-3 text-[10px] uppercase tracking-widest rounded-sm hover:bg-[#8f662a] transition-colors">
                Explore Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {savedProducts.map((savedItem) => {
                const product = savedItem.products;
                if (!product) return null;

                return (
                  <div key={savedItem.id} className="group relative bg-[#050505] border border-white/10 rounded-sm overflow-hidden hover:border-[#B08038]/50 transition-colors">
                    
                    <div className="aspect-square p-4 bg-zinc-900/50 flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.image_url} 
                        alt={product.title} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    
                    <div className="p-4 border-t border-white/5">
                      <h4 className="text-[#B08038] text-xs font-bold uppercase tracking-wider mb-1 truncate">
                        {product.title}
                      </h4>
                      <p className="text-zinc-500 text-[10px] tracking-widest uppercase">
                        {product.item_code}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}